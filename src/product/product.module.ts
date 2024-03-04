import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'libs/cloudinary/cloudinary.module';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { RedisModule } from 'libs/redis/redis.module';
import { CreateProductHandler } from './application/command/product/create/handler';
import { DeleteProductHandler } from './application/command/product/delete/handler';
import { FindProductByCodeHandler } from './application/query/product/detail/handler';
import { FindProductByAdminHandler } from './application/query/product/find-by-admin/handler';
import { FindProductByBrandHandler } from './application/query/product/find-by-brand/handler';
import { FindProductByCategoryHandler } from './application/query/product/find-by-category/handler';
import { FindProductByIdHandler } from './application/query/product/find-by-id/handler';
import { FindProductByIdsHandler } from './application/query/product/find-by-ids/handler';
import { FindProductSimilarHandler } from './application/query/product/find-similar/handler';
import { FindProductHandler } from './application/query/product/find/handler';
import { GetTotalProductHandler } from './application/query/product/get-total/handler';
import { ProductFactory } from './infrastructure/factory/product';
import { ProductQueryImplement } from './infrastructure/query';
import { ProductRepositoryImplement } from './infrastructure/repository';
import { ProductCommandController } from './presentation/command.controller';
import { ProductQueryController } from './presentation/query.controller';

const infrastructure = [ProductQueryImplement, ProductRepositoryImplement];

const commands = [CreateProductHandler, DeleteProductHandler];

const queries = [
  FindProductByCodeHandler,
  FindProductHandler,
  FindProductByBrandHandler,
  FindProductByCategoryHandler,
  GetTotalProductHandler,
  FindProductByAdminHandler,
  FindProductByIdsHandler,
  FindProductSimilarHandler,
  FindProductByIdHandler,
];

const domain = [ProductFactory];

@Module({
  imports: [CqrsModule, PrismaModule, CloudinaryModule, RedisModule],
  controllers: [ProductQueryController, ProductCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class ProductModule {}
