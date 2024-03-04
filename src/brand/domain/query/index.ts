import { FindBrandById } from '../../application/query/brand/detail';
import { FindBrandByIdResult } from '../../application/query/brand/detail/result';
import { FindBrand } from '../../application/query/brand/find';
import { FindBrandByCode } from '../../application/query/brand/find-by-code';
import { FindBrandByCodeResult } from '../../application/query/brand/find-by-code/result';
import { FindBrandResult } from '../../application/query/brand/find/result';
import { GetTotalBrandResult } from '../../application/query/brand/get-total/result';

export interface BrandQuery {
  find: (query: FindBrand) => Promise<FindBrandResult>;
  findById: (query: FindBrandById) => Promise<FindBrandByIdResult>;
  findByCode: (query: FindBrandByCode) => Promise<FindBrandByCodeResult>;
  getTotal: () => Promise<GetTotalBrandResult>;
}
