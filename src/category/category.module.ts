import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'libs/cloudinary/cloudinary.module';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { RedisModule } from 'libs/redis/redis.module';
import { CreateCategoryHandler } from './application/command/category/create/handler';
import { FindCategoryByIdHandler } from './application/query/category/detail/handler';
import { FindCategoryByCodeHandler } from './application/query/category/find-by-code/handler';
import { FindCategoryHandler } from './application/query/category/find/handler';
import { GetTotalCategoryHandler } from './application/query/category/get-total/handler';
import { CategoryFactory } from './infrastructure/factory/category';
import { CategoryQueryImplement } from './infrastructure/query';
import { CategoryRepositoryImplement } from './infrastructure/repository';
import { CategoryCommandController } from './presentation/command.controller';
import { CategoryQueryController } from './presentation/query.controller';

const infrastructure = [CategoryQueryImplement, CategoryRepositoryImplement];

const commands = [CreateCategoryHandler];

const queries = [FindCategoryByCodeHandler, FindCategoryByIdHandler, FindCategoryHandler, GetTotalCategoryHandler];

const domain = [CategoryFactory];

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule, CloudinaryModule],
  controllers: [CategoryQueryController, CategoryCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class CategoryModule {}
