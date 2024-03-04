import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetTotalProductResult implements IQueryResult {
  @Expose()
  readonly total: number;
}
