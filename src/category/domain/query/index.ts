import { FindCategoryById } from '../../application/query/category/detail';
import { FindCategoryByIdResult } from '../../application/query/category/detail/result';
import { FindCategory } from '../../application/query/category/find';
import { FindCategoryByCode } from '../../application/query/category/find-by-code';
import { FindCategoryByCodeResult } from '../../application/query/category/find-by-code/result';
import { FindCategoryResult } from '../../application/query/category/find/result';
import { GetTotalCategoryResult } from '../../application/query/category/get-total/result';

export interface CategoryQuery {
  find: (query: FindCategory) => Promise<FindCategoryResult>;
  findById: (query: FindCategoryById) => Promise<FindCategoryByIdResult>;
  findByCode: (query: FindCategoryByCode) => Promise<FindCategoryByCodeResult>;
  getTotal: () => Promise<GetTotalCategoryResult>;
}
