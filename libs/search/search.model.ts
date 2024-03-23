import { Brands, Categories, Images, PIC } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ProductSearchModel {
  @Expose()
  id: string;
  @Expose()
  productCode: string;
  @Expose()
  name: string;
  @Expose()
  category: Categories;
  @Expose()
  categoryId: string;
  @Expose()
  brand: Brands;
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
}
