import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductByIdsResultItem {
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

export class FindProductByIdsResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductByIdsResultItem>[];
  @Expose()
  readonly total: number;
}
