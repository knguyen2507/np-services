import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindUserResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly username: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly phone: string;
}

export class FindUserResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindUserResultItem>[];
  @Expose()
  readonly total: number;
}
