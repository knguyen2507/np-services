import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductSameCategoryResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly productCode: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly price: number;
  @Expose()
  readonly thumbnailLink: string;
}

export class FindProductSameCategoryResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductSameCategoryResultItem>[];
  @Expose()
  readonly total: number;
}
