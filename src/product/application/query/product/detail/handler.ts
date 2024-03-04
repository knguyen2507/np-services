import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductByCode } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductByCodeResult } from './result';

@QueryHandler(FindProductByCode)
export class FindProductByCodeHandler implements IQueryHandler<FindProductByCode, FindProductByCodeResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductByCode): Promise<FindProductByCodeResult> {
    return await this.Product.findByCode(query);
  }
}
