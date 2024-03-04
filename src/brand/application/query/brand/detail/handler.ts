import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBrandById } from '.';
import { BrandQueryImplement } from '../../../../infrastructure/query';
import { FindBrandByIdResult } from './result';

@QueryHandler(FindBrandById)
export class FindBrandByIdHandler implements IQueryHandler<FindBrandById, FindBrandByIdResult> {
  @Inject()
  private readonly brand: BrandQueryImplement;

  async execute(query: FindBrandById): Promise<FindBrandByIdResult> {
    return await this.brand.findById(query);
  }
}
