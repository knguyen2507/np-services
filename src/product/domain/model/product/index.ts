import { Expose } from 'class-transformer';

export type PIC = {
  id: string;
  username: string;
  at: Date;
};

export type Images = {
  id: string;
  name: string;
  url: string;
  isMain: boolean;
};

export class ProductModel {
  @Expose()
  id: string;
  @Expose()
  productCode: string;
  @Expose()
  name: string;
  @Expose()
  categoryId: string;
  @Expose()
  brandId: string;
  @Expose()
  qty: number;
  @Expose()
  purchase: number;
  @Expose()
  price: number;
  @Expose()
  description: string;
  @Expose()
  thumbnailLink: Images;
  @Expose()
  images: Images[];
  @Expose()
  created: PIC;
  @Expose()
  updated: PIC[];

  update(data: Partial<this>) {
    this.qty = data.qty ? data.qty : this.qty;
    this.price = data.price ? data.price : this.price;
  }
}
