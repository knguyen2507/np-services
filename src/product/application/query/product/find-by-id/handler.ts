import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductById } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductByIdResult } from './result';

@QueryHandler(FindProductById)
export class FindProductByIdHandler implements IQueryHandler<FindProductById, FindProductByIdResult> {
  @Inject()
  private readonly product: ProductQueryImplement;

  async execute(query: FindProductById): Promise<FindProductByIdResult> {
    return await this.product.findById(query);
  }
}
