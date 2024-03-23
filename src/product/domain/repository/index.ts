import { ProductSearchModel } from 'libs/search/search.model';
import { ProductModel } from '../model/product';

export interface ProductRepository {
  save: (data: ProductModel) => Promise<ProductModel>;
  createSearch: (data: ProductSearchModel) => Promise<void>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: ProductModel) => Promise<ProductModel>;
  getById: (id: string) => Promise<ProductModel>;
  getByIds: (id: string | string[]) => Promise<ProductModel[]>;
}
