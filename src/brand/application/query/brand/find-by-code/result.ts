import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindBrandByCodeResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly brandCode: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly thumbnailLink: string;
}
