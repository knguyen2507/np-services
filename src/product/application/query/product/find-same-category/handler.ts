import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductSameCategory } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductSameCategoryResult } from './result';

@QueryHandler(FindProductSameCategory)
export class FindProductSameCategoryHandler
  implements IQueryHandler<FindProductSameCategory, FindProductSameCategoryResult>
{
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductSameCategory): Promise<FindProductSameCategoryResult> {
    return await this.Product.findSameCategory(query);
  }
}
