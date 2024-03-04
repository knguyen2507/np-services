import { Brands } from '@prisma/client';
import { BrandModel } from '../../../domain/model/brand';
import { BaseFactory } from '../base';

export class BrandFactory extends BaseFactory {
  createBrandModel(brand: Brands | null) {
    if (!brand) return null;

    const entity = this.createModel(BrandModel, {
      ...brand,
    });

    return entity;
  }

  createBrandModels(brands: Brands[] | null) {
    if (!brands) return null;

    return brands.map((a) => this.createBrandModel(a));
  }
}
