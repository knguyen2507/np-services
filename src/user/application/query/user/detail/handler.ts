import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserById } from '.';
import { UserQueryImplement } from '../../../../infrastructure/query/user';
import { FindUserByIdResult } from './result';

@QueryHandler(FindUserById)
export class FindUserByIdHandler implements IQueryHandler<FindUserById, FindUserByIdResult> {
  @Inject()
  private readonly user: UserQueryImplement;

  async execute(query: FindUserById): Promise<FindUserByIdResult> {
    return await this.user.findById(query);
  }
}
