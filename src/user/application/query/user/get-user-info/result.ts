import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetUserInfoResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly username: string;
  @Expose()
  readonly created: Date;
}
