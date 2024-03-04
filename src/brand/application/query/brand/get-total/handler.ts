import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalBrand } from '.';
import { BrandQueryImplement } from '../../../../infrastructure/query';
import { GetTotalBrandResult } from './result';

@QueryHandler(GetTotalBrand)
export class GetTotalBrandHandler implements IQueryHandler<GetTotalBrand, GetTotalBrandResult> {
  @Inject()
  private readonly brand: BrandQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetTotalBrand): Promise<GetTotalBrandResult> {
    return await this.brand.getTotal();
  }
}
