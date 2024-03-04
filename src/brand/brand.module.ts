import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'libs/cloudinary/cloudinary.module';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { RedisModule } from 'libs/redis/redis.module';
import { CreateBrandHandler } from './application/command/brand/create/handler';
import { FindBrandByIdHandler } from './application/query/brand/detail/handler';
import { FindBrandByCodeHandler } from './application/query/brand/find-by-code/handler';
import { FindBrandHandler } from './application/query/brand/find/handler';
import { GetTotalBrandHandler } from './application/query/brand/get-total/handler';
import { BrandFactory } from './infrastructure/factory/brand';
import { BrandQueryImplement } from './infrastructure/query';
import { BrandRepositoryImplement } from './infrastructure/repository';
import { BrandCommandController } from './presentation/command.controller';
import { BrandQueryController } from './presentation/query.controller';

const infrastructure = [BrandQueryImplement, BrandRepositoryImplement];

const commands = [CreateBrandHandler];

const queries = [FindBrandByIdHandler, FindBrandByCodeHandler, FindBrandHandler, GetTotalBrandHandler];

const domain = [BrandFactory];

@Module({
  imports: [CqrsModule, PrismaModule, CloudinaryModule, RedisModule],
  controllers: [BrandQueryController, BrandCommandController],
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class BrandModule {}
