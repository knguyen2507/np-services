import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductSamePrice } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductSamePriceResult } from './result';

@QueryHandler(FindProductSamePrice)
export class FindProductSamePriceHandler implements IQueryHandler<FindProductSamePrice, FindProductSamePriceResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductSamePrice): Promise<FindProductSamePriceResult> {
    return await this.Product.findSamePrice(query);
  }
}
