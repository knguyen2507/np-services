import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategory } from '.';
import { CategoryQueryImplement } from '../../../../infrastructure/query';
import { FindCategoryResult } from './result';

@QueryHandler(FindCategory)
export class FindCategoryHandler implements IQueryHandler<FindCategory, FindCategoryResult> {
  @Inject()
  private readonly category: CategoryQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: FindCategory): Promise<FindCategoryResult> {
    return await this.category.find();
  }
}
