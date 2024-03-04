import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductByAdminResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly productCode: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly qty: number;
  @Expose()
  readonly purchase: number;
  @Expose()
  readonly price: number;
  @Expose()
  readonly thumbnailLink: string;
  @Expose()
  readonly brand: string;
  @Expose()
  readonly category: string;
  @Expose()
  readonly createdAt: Date;
}

export class FindProductByAdminResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductByAdminResultItem>[];
  @Expose()
  readonly total: number;
}
