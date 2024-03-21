import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductSamePriceResultItem {
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

export class FindProductSamePriceResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductSamePriceResultItem>[];
  @Expose()
  readonly total: number;
}
