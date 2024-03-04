import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryByCode } from '.';
import { CategoryQueryImplement } from '../../../../infrastructure/query';
import { FindCategoryByCodeResult } from './result';

@QueryHandler(FindCategoryByCode)
export class FindCategoryByCodeHandler implements IQueryHandler<FindCategoryByCode, FindCategoryByCodeResult> {
  @Inject()
  private readonly category: CategoryQueryImplement;

  async execute(query: FindCategoryByCode): Promise<FindCategoryByCodeResult> {
    return await this.category.findByCode(query);
  }
}
