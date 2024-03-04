import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductByAdmin } from '.';
import { ProductQueryImplement } from '../../../../infrastructure/query';
import { FindProductByAdminResult } from './result';

@QueryHandler(FindProductByAdmin)
export class FindProductByAdminHandler implements IQueryHandler<FindProductByAdmin, FindProductByAdminResult> {
  @Inject()
  private readonly Product: ProductQueryImplement;

  async execute(query: FindProductByAdmin): Promise<FindProductByAdminResult> {
    return await this.Product.findByAdmin(query);
  }
}
