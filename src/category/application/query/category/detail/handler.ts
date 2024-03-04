import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryById } from '.';
import { CategoryQueryImplement } from '../../../../infrastructure/query';
import { FindCategoryByIdResult } from './result';

@QueryHandler(FindCategoryById)
export class FindCategoryByIdHandler implements IQueryHandler<FindCategoryById, FindCategoryByIdResult> {
  @Inject()
  private readonly category: CategoryQueryImplement;

  async execute(query: FindCategoryById): Promise<FindCategoryByIdResult> {
    return await this.category.findById(query);
  }
}
