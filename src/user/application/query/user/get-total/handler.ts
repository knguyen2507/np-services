import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalUser } from '.';
import { UserQueryImplement } from '../../../../infrastructure/query/user';
import { GetTotalUserResult } from './result';

@QueryHandler(GetTotalUser)
export class GetTotalUserHandler
  implements IQueryHandler<GetTotalUser, GetTotalUserResult>
{
  @Inject()
  private readonly user: UserQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetTotalUser): Promise<GetTotalUserResult> {
    return await this.user.getTotal();
  }
}
