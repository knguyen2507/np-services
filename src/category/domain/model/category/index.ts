import { Expose } from 'class-transformer';

export type PIC = {
  id: string;
  username: string;
  at: Date;
};

export class CategoryModel {
  @Expose()
  id: string;
  @Expose()
  categoryCode: string;
  @Expose()
  name: string;
  @Expose()
  thumbnailLink: string;
  @Expose()
  created: PIC;
  @Expose()
  updated: PIC[];
}
