import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { UpdateShopHandler } from './application/command/shop/update/handler';
import { CreateUserHandler } from './application/command/user/create/handler';
import { LoginHandler } from './application/command/user/login/handler';
import { LogoutHandler } from './application/command/user/logout/handler';
import { UpdatePasswordHandler } from './application/command/user/update/password/handler';
import { FindShopHandler } from './application/query/shop/find/handler';
import { FindUserByIdHandler } from './application/query/user/detail/handler';
import { FindUserHandler } from './application/query/user/find/handler';
import { GetTotalUserHandler } from './application/query/user/get-total/handler';
import { VerifyAccessTokenHandler } from './application/query/user/verify-token/handler';
import { ShopFactory } from './infrastructure/factory/shop';
import { UserFactory } from './infrastructure/factory/user';
import { ShopQueryImplement } from './infrastructure/query/shop';
import { UserQueryImplement } from './infrastructure/query/user';
import { ShopRepositoryImplement } from './infrastructure/repository/shop';
import { UserRepositoryImplement } from './infrastructure/repository/user';
import { ShopCommandController } from './presentation/shop/command.controller';
import { ShopQueryController } from './presentation/shop/query.controller';
import { UserCommandController } from './presentation/user/command.controller';
import { UserQueryController } from './presentation/user/query.controller';

const infrastructure = [UserQueryImplement, UserRepositoryImplement, ShopQueryImplement, ShopRepositoryImplement];

const commands = [CreateUserHandler, LoginHandler, UpdatePasswordHandler, LogoutHandler, UpdateShopHandler];

const queries = [FindUserByIdHandler, FindUserHandler, GetTotalUserHandler, VerifyAccessTokenHandler, FindShopHandler];

const domain = [UserFactory, ShopFactory];

const controllers = [UserQueryController, UserCommandController, ShopQueryController, ShopCommandController];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: controllers,
  providers: [...infrastructure, ...commands, ...queries, ...domain],
})
export class UserModule {}
