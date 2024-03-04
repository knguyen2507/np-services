import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyAccessToken } from '.';
import { UserQueryImplement } from '../../../../infrastructure/query/user';
import { VerifyAccessTokenResult } from './result';

@QueryHandler(VerifyAccessToken)
export class VerifyAccessTokenHandler
  implements IQueryHandler<VerifyAccessToken, VerifyAccessTokenResult>
{
  @Inject()
  private readonly user: UserQueryImplement;

  async execute(query: VerifyAccessToken): Promise<VerifyAccessTokenResult> {
    const payload = { token: query.data.accessToken, user: query.data.user };
    return await this.user.getDataByToken(payload);
  }
}
