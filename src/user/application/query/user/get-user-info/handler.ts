import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserInfo } from '.';
import { UserQueryImplement } from '../../../../infrastructure/query/user';
import { GetUserInfoResult } from './result';

@QueryHandler(GetUserInfo)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfo, GetUserInfoResult> {
  @Inject()
  private readonly user: UserQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUserInfo): Promise<GetUserInfoResult> {
    return await this.user.getInfo(query);
  }
}
