import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProduct } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductResult } from './result';

@QueryHandler(FindProduct)
export class FindProductHandler implements IQueryHandler<FindProduct, FindProductResult> {
  @Inject()
  private readonly product: ProductQueryImplement;

  async execute(query: FindProduct): Promise<FindProductResult> {
    return await this.product.find(query);
  }
}
