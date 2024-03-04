import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindCategoryByCodeResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly categoryCode: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly thumbnailLink: string;
}
