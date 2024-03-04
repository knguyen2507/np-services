import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindBrandResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly thumbnailLink: string;
  @Expose()
  readonly brandCode: string;
}

export class FindBrandResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindBrandResultItem>[];
  @Expose()
  readonly total: number;
}
