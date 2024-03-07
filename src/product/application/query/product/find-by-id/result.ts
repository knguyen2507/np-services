import { IQueryResult } from '@nestjs/cqrs';
import { Images } from '@prisma/client';
import { Expose } from 'class-transformer';

export class FindProductByIdResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly productCode: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly category: string;
  @Expose()
  readonly brand: string;
  @Expose()
  readonly qty: number;
  @Expose()
  readonly purchase: number;
  @Expose()
  readonly price: number;
  @Expose()
  readonly description: string;
  @Expose()
  readonly thumbnailLink: Images;
  @Expose()
  readonly images: Images[];
  @Expose()
  readonly createdAt: Date;
}
