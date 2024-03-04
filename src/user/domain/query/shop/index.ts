import { FindShop } from '../../../application/query/shop/find';
import { FindShopResult } from '../../../application/query/shop/find/result';

export interface ShopQuery {
  find: (query: FindShop) => Promise<FindShopResult>;
}
