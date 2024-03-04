import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductByCategoryResultItem {
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

export class FindProductByCategoryResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductByCategoryResultItem>[];
  @Expose()
  readonly total: number;
}
