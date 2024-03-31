import { Module } from '@nestjs/common';
import { CaslModule } from '../libs/casl/casl.module';
import { CloudinaryModule } from '../libs/cloudinary/cloudinary.module';
import { GuardModule } from '../libs/guard/guard.module';
import { PrismaModule } from '../libs/prisma/prisma.module';
import { RedisModule } from '../libs/redis/redis.module';
import { UtilityModule } from '../libs/utility/utility.module';
import { AppController } from './app.controller';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    UtilityModule,
    GuardModule,
    RedisModule,
    CloudinaryModule,
    CaslModule,
    UserModule,
    BrandModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
