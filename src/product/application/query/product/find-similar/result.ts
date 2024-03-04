import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductSimilarResultItem {
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

export class FindProductSimilarResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductSimilarResultItem>[];
  @Expose()
  readonly total: number;
}
