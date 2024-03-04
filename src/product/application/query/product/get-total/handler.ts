import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalProduct } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { GetTotalProductResult } from './result';

@QueryHandler(GetTotalProduct)
export class GetTotalProductHandler implements IQueryHandler<GetTotalProduct, GetTotalProductResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: GetTotalProduct): Promise<GetTotalProductResult> {
    return await this.Product.getTotal(query);
  }
}
