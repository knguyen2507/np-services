import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductResultItem {
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

export class FindProductResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductResultItem>[];
  @Expose()
  readonly total: number;
}
