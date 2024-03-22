import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Global, Inject, Injectable, Module } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Products } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { Cache } from 'cache-manager';
import { SearchModule } from 'libs/search/search.module';
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
    private readonly elasticsearch: ElasticsearchService,
  ) {}

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

  async indexProduct(product: Products): Promise<any> {
    return this.elasticsearch.index<any>({
      index: 'products',
      body: {
        id: product.id,
        productCode: product.productCode,
        name: product.name,
        categoryId: product.categoryId,
        brandId: product.brandId,
        qty: product.qty,
        purchase: product.purchase,
        price: product.price,
        thumbnailLink: product.thumbnailLink,
        description: product.description,
        images: product.images,
        created: product.created,
        updated: product.updated,
      },
    });
  }
}

@Global()
@Module({
  imports: [JwtModule.register({}), RedisModule, PrismaModule, SearchModule],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
