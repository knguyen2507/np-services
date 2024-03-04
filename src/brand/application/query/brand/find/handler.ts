import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBrand } from '.';
import { BrandQueryImplement } from '../../../../infrastructure/query';
import { FindBrandResult } from './result';

@QueryHandler(FindBrand)
export class FindBrandHandler implements IQueryHandler<FindBrand, FindBrandResult> {
  @Inject()
  private readonly brand: BrandQueryImplement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: FindBrand): Promise<FindBrandResult> {
    return await this.brand.find();
  }
}
