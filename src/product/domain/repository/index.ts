import { ProductModel } from '../model/product';

export interface ProductRepository {
  save: (data: ProductModel) => Promise<ProductModel>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: ProductModel) => Promise<ProductModel>;
  getById: (id: string) => Promise<ProductModel>;
  getByIds: (id: string | string[]) => Promise<ProductModel[]>;
}
