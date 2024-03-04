import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBrandByCode } from '.';
import { BrandQueryImplement } from '../../../../infrastructure/query';
import { FindBrandByCodeResult } from './result';

@QueryHandler(FindBrandByCode)
export class FindBrandByCodeHandler implements IQueryHandler<FindBrandByCode, FindBrandByCodeResult> {
  @Inject()
  private readonly brand: BrandQueryImplement;

  async execute(query: FindBrandByCode): Promise<FindBrandByCodeResult> {
    return await this.brand.findByCode(query);
  }
}
