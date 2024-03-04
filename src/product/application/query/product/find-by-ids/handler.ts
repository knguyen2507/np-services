import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductByIds } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductByIdsResult } from './result';

@QueryHandler(FindProductByIds)
export class FindProductByIdsHandler implements IQueryHandler<FindProductByIds, FindProductByIdsResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductByIds): Promise<FindProductByIdsResult> {
    return await this.Product.findByIds(query);
  }
}
