import { CategoryModel } from '../model/category';

export interface CategoryRepository {
  save: (data: CategoryModel) => Promise<CategoryModel>;
  remove: (id: string | string[]) => Promise<void>;
}
