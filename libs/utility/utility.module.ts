import { faker } from '@faker-js/faker';
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
import { InitialBrand, InitialCategory, InitialUser1 } from './const/initial';
import { UserInterface } from './interface/user.interface';
import { LogType } from './type';

@Injectable()
export class UtilityImplement {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly redis: Cache,
    private readonly prisma: PrismaService,
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
}

@Injectable()
export class ApiServiceMock {
  getBrands() {
    return InitialBrand;
  }

  getcategories() {
    return InitialCategory;
  }

  getProducts() {
    const products = [];
    for (let i = 1; i <= 1000; i++) {
      const thumbnailLink = {
        id: new ObjectId().toString(),
        name: `${faker.animal.fish()}-${i}-0`,
        url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
        isMain: true,
      };
      const images = [];

      images.push(thumbnailLink);
      for (let j = 1; j < faker.number.int({ min: 2, max: 3 }); j++) {
        images.push({
          id: new ObjectId().toString(),
          name: `${faker.animal.fish()}-${i}-${j}`,
          url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
          isMain: false,
        });
      }

      let description = '';
      for (let i = 0; i < faker.number.int({ min: 1, max: 2 }); i++) {
        i === 0
          ? (description += `${faker.animal.bird()}-${i}:${faker.lorem.paragraphs({
              min: 1,
              max: 1,
            })}`)
          : (description += `*done*${faker.animal.bird()}-${i}:${faker.lorem.paragraphs({ min: 1, max: 1 })}`);
      }

      const brand = faker.helpers.arrayElement(InitialBrand);
      const category = faker.helpers.arrayElement(InitialCategory);
      const purchase = faker.number.int({ min: 100, max: 500 });

      products.push({
        id: `507f191e810c19729de86${String(i).padStart(3, '0')}`,
        name: `${category.name} ${brand.name} ${i}`,
        productCode: `test-product-${i}`,
        categoryId: category.id,
        brandId: brand.id,
        qty: faker.number.int({ min: 0, max: 5 }),
        purchase,
        price: purchase + faker.number.int({ min: 10, max: 50 }),
        thumbnailLink,
        description,
        images,
        created: {
          id: InitialUser1.id,
          username: InitialUser1.username,
          at: moment().toDate(),
        },
      });
    }
  }
}

@Global()
@Module({
  imports: [JwtModule.register({}), RedisModule, PrismaModule],
  providers: [UtilityImplement, ApiServiceMock],
  exports: [UtilityImplement, ApiServiceMock],
})
export class UtilityModule {}
