import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalCategory } from '.';
import { CategoryQueryImplement } from '../../../../infrastructure/query';
import { GetTotalCategoryResult } from './result';

@QueryHandler(GetTotalCategory)
export class GetTotalCategoryHandler implements IQueryHandler<GetTotalCategory, GetTotalCategoryResult> {
  @Inject()
  private readonly category: CategoryQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetTotalCategory): Promise<GetTotalCategoryResult> {
    return await this.category.getTotal();
  }
}
