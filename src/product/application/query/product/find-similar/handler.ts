import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductSimilar } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductSimilarResult } from './result';

@QueryHandler(FindProductSimilar)
export class FindProductSimilarHandler implements IQueryHandler<FindProductSimilar, FindProductSimilarResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductSimilar): Promise<FindProductSimilarResult> {
    return await this.Product.findSimilar(query);
  }
}
