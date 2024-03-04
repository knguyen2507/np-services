import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetTotalUserResult implements IQueryResult {
  @Expose()
  readonly total: number;
}
