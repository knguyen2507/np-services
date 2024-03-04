import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class UserDataResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly username: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly phone: string;
}

export class VerifyAccessTokenResult implements IQueryResult {
  @Expose()
  readonly user: Readonly<UserDataResult>;
  @Expose()
  readonly accessToken: string;
}
