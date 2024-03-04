import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductByBrand } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductByBrandResult } from './result';

@QueryHandler(FindProductByBrand)
export class FindProductByBrandHandler implements IQueryHandler<FindProductByBrand, FindProductByBrandResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductByBrand): Promise<FindProductByBrandResult> {
    return await this.Product.findByBrand(query);
  }
}
