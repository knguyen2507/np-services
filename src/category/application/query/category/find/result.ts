import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindCategoryResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly thumbnailLink: string;
  @Expose()
  readonly categoryCode: string;
}

export class FindCategoryResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindCategoryResultItem>[];
  @Expose()
  readonly total: number;
}
