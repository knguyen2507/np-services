import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PrismaService } from 'libs/prisma/prisma.service';
import { UserInterface } from 'libs/utility/interface/user.interface';
import { UtilityImplement } from 'libs/utility/utility.module';
import { FindUserById } from '../../../application/query/user/detail';
import { FindUserByIdResult } from '../../../application/query/user/detail/result';
import { FindUser } from '../../../application/query/user/find';
import { FindUserResult, FindUserResultItem } from '../../../application/query/user/find/result';
import { GetTotalUserResult } from '../../../application/query/user/get-total/result';
import { GetUserInfo } from '../../../application/query/user/get-user-info';
import { GetUserInfoResult } from '../../../application/query/user/get-user-info/result';
import { VerifyAccessTokenResult } from '../../../application/query/user/verify-token/result';
import { UserQuery } from '../../../domain/query/user';

export class UserQueryImplement implements UserQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async find(query: FindUser): Promise<FindUserResult> {
    const { offset, limit, searchModel } = query.data;
    const conditions = [];
    const search: { [key: string]: any } = searchModel ? JSON.parse(searchModel) : undefined;

    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        const { value } = this.util.buildSearch(item);
        obj[prop] = value;
        conditions.push(obj);
      }
    }

    const [users, total] = await Promise.all([
      this.prisma.users.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        orderBy: [
          {
            created: 'desc',
          },
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.users.count(),
    ]);

    return {
      items: users.map((i) => {
        return plainToClass(FindUserResultItem, i, {
          excludeExtraneousValues: true,
        });
      }),
      total,
    };
  }

  async findById(query: FindUserById): Promise<FindUserByIdResult> {
    const user = await this.prisma.users.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindUserByIdResult, user, {
      excludeExtraneousValues: true,
    });
  }

  async getTotal(): Promise<GetTotalUserResult> {
    const total = await this.prisma.users.count();

    return plainToClass(GetTotalUserResult, { total }, { excludeExtraneousValues: true });
  }

  async getInfo(query: GetUserInfo): Promise<GetUserInfoResult> {
    const user = await this.prisma.users.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(
      GetUserInfoResult,
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        username: user.username,
        created: user.created,
      },
      { excludeExtraneousValues: true },
    );
  }

  getDataByToken: (query: { token: string; user: UserInterface }) => Promise<VerifyAccessTokenResult> = async (
    query,
  ) => {
    const { token, user } = query;
    // check token in black list
    const BlackListed = await this.util.getRedisKey(`blacklist:${token}`);
    if (BlackListed) throw new HttpException('Token Expired', HttpStatus.UNAUTHORIZED);

    const payload = this.util.verifyAccessToken(token); // verify access token
    let accessToken = '';
    let refreshToken = '';

    if (payload) {
      accessToken = token; // access token is valid
    } else {
      // check refresh token in db
      refreshToken = await this.util.getRedisKey(token);
      if (!refreshToken) throw new HttpException('Token Expired', HttpStatus.UNAUTHORIZED);

      // verify refresh token
      const data = this.util.verifyRefreshToken(refreshToken);
      if (!data) {
        // access token, refresh token invalid
        await this.util.deleteRefreshToken(token);
        throw new HttpException('Token Expired', HttpStatus.UNAUTHORIZED);
      }

      // sign new access token
      accessToken = this.util.generateAccessToken(data);
    }

    return plainToInstance(
      VerifyAccessTokenResult,
      {
        user: {
          ...user,
          id: null,
          roleId: null,
        },
        accessToken,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  };
}
