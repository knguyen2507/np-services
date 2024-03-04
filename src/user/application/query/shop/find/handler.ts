import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindShop } from '.';
import { ShopQueryImplement } from '../../../../infrastructure/query/shop';
import { FindShopResult } from './result';

@QueryHandler(FindShop)
export class FindShopHandler implements IQueryHandler<FindShop, FindShopResult> {
  @Inject()
  private readonly shop: ShopQueryImplement;

  async execute(query: FindShop): Promise<FindShopResult> {
    return await this.shop.find(query);
  }
}
