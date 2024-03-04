import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetTotalBrandResult implements IQueryResult {
  @Expose()
  readonly total: number;
}
