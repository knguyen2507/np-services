import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductSameBrand } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductSameBrandResult } from './result';

@QueryHandler(FindProductSameBrand)
export class FindProductSameBrandHandler implements IQueryHandler<FindProductSameBrand, FindProductSameBrandResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductSameBrand): Promise<FindProductSameBrandResult> {
    return await this.Product.findSameBrand(query);
  }
}
