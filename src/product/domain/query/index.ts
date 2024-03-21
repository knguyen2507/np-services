import { FindProductByCode } from '../../application/query/product/detail';
import { FindProductByCodeResult } from '../../application/query/product/detail/result';
import { FindProduct } from '../../application/query/product/find';
import { FindProductByAdmin } from '../../application/query/product/find-by-admin';
import { FindProductByAdminResult } from '../../application/query/product/find-by-admin/result';
import { FindProductByBrand } from '../../application/query/product/find-by-brand';
import { FindProductByBrandResult } from '../../application/query/product/find-by-brand/result';
import { FindProductByCategory } from '../../application/query/product/find-by-category';
import { FindProductByCategoryResult } from '../../application/query/product/find-by-category/result';
import { FindProductById } from '../../application/query/product/find-by-id';
import { FindProductByIdResult } from '../../application/query/product/find-by-id/result';
import { FindProductByIds } from '../../application/query/product/find-by-ids';
import { FindProductByIdsResult } from '../../application/query/product/find-by-ids/result';
import { FindProductSameBrand } from '../../application/query/product/find-same-brand';
import { FindProductSameBrandResult } from '../../application/query/product/find-same-brand/result';
import { FindProductSameCategory } from '../../application/query/product/find-same-category';
import { FindProductSameCategoryResult } from '../../application/query/product/find-same-category/result';
import { FindProductSamePrice } from '../../application/query/product/find-same-price';
import { FindProductSamePriceResult } from '../../application/query/product/find-same-price/result';
import { FindProductSimilar } from '../../application/query/product/find-similar';
import { FindProductSimilarResult } from '../../application/query/product/find-similar/result';
import { FindProductResult } from '../../application/query/product/find/result';
import { GetTotalProduct } from '../../application/query/product/get-total';
import { GetTotalProductResult } from '../../application/query/product/get-total/result';

export interface ProductQuery {
  find: (query: FindProduct) => Promise<FindProductResult>;
  findByAdmin: (query: FindProductByAdmin) => Promise<FindProductByAdminResult>;
  findByCode: (query: FindProductByCode) => Promise<FindProductByCodeResult>;
  findById: (query: FindProductById) => Promise<FindProductByIdResult>;
  findByBrand: (query: FindProductByBrand) => Promise<FindProductByBrandResult>;
  findByCategory: (query: FindProductByCategory) => Promise<FindProductByCategoryResult>;
  getTotal: (query: GetTotalProduct) => Promise<GetTotalProductResult>;
  findByIds: (query: FindProductByIds) => Promise<FindProductByIdsResult>;
  findSimilar: (query: FindProductSimilar) => Promise<FindProductSimilarResult>;
  findSameBrand: (query: FindProductSameBrand) => Promise<FindProductSameBrandResult>;
  findSameCategory: (query: FindProductSameCategory) => Promise<FindProductSameCategoryResult>;
  findSamePrice: (query: FindProductSamePrice) => Promise<FindProductSamePriceResult>;
}
