import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Global, Inject, Injectable, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { Cache } from 'cache-manager';
import moment from 'moment';
import { environment } from '../../src/environment';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { RedisModule } from '../redis/redis.module';
import { UserInterface } from './interface/user.interface';
import { LogType } from './type';

@Injectable()
export class UtilityImplement {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly redis: Cache,
    private readonly prisma: PrismaService,
  ) { }

  generateId() {
    return new ObjectId().toString();
  }

  passwordHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  passwordVerify(plainPass: string, hashedPass: string): boolean {
    return bcrypt.compareSync(plainPass, hashedPass);
  }

  generateAccessToken(user: UserInterface): string {
    return this.jwtService.sign(
      { user },
      {
        secret: environment.JWT_ACCESS_SECRET,
        expiresIn: `${environment.JWT_ACCESS_EXPIRE}d`,
      },
    );
  }

  generateRefreshToken(user: UserInterface): string {
    return this.jwtService.sign(
      { user },
      {
        secret: environment.JWT_REFRESH_SECRET,
        expiresIn: `${environment.JWT_REFRESH_EXPIRE}d`,
      },
    );
  }

  verifyAccessToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: environment.JWT_ACCESS_SECRET,
    });
  }

  verifyRefreshToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: environment.JWT_REFRESH_SECRET,
    });
  }

  async setRefreshToken(accessToken: string, refreshToken: string) {
    await this.redis.set(accessToken, refreshToken, {
      ttl: environment.JWT_REFRESH_EXPIRE * 24 * 3600,
    } as any);
  }

  async deleteRefreshToken(id: string) {
    await this.redis.del(id);
  }

  async getRedisKey(key: string): Promise<string | undefined> {
    return await this.redis.get(key);
  }

  async setBlackListToken(key: string, value: string) {
    await this.redis.set(key, value, {
      ttl: environment.JWT_ACCESS_EXPIRE * 24 * 3600,
    } as any);
  }

  async setNonce(key: string) {
    await this.redis.set(key, 'nonce', { ttl: 3600 } as any);
  }

  async setRedisTransactions(key: string): Promise<string | undefined> {
    return await this.redis.get(key);
  }

  async handleError<T>(promise: Promise<T>): Promise<[any, undefined] | (T | undefined)[]> {
    return promise.then((data) => [undefined, data]).catch((error) => [error, undefined]);
  }

  async writeLog(log: LogType) {
    await this.prisma.logs.create({
      data: log,
    });
  }

  buildSearch(item: any) {
    let value;
    if (item.valueType === 'text') {
      value = { contains: item.value, mode: 'insensitive' };
    }
    if (item.valueType === 'number') {
      value = Number(item.value);
    }
    if (item.valueType === 'date') {
      const fromDate = moment(item.fromDate).toDate();
      const toDate = moment(item.toDate).toDate();
      value = { gte: fromDate, lt: toDate };
    }
    if (item.valueType === 'set') {
      value = { in: Array.from(item.value) };
    }
    if (item.valueType === 'boolean') {
      value = { eq: item.value };
    }

    return { value };
  }
}

@Global()
@Module({
  imports: [JwtModule.register({}), RedisModule, PrismaModule],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule { }
