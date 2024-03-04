import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductByCategory } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductByCategoryResult } from './result';

@QueryHandler(FindProductByCategory)
export class FindProductByCategoryHandler implements IQueryHandler<FindProductByCategory, FindProductByCategoryResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductByCategory): Promise<FindProductByCategoryResult> {
    return await this.Product.findByCategory(query);
  }
}
