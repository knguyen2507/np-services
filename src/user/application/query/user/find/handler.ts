import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUser } from '.';
import { UserQueryImplement } from '../../../../infrastructure/query/user';
import { FindUserResult } from './result';

@QueryHandler(FindUser)
export class FindUserHandler implements IQueryHandler<FindUser, FindUserResult> {
  @Inject()
  private readonly user: UserQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: FindUser): Promise<FindUserResult> {
    return await this.user.find();
  }
}
