import { Products } from '@prisma/client';
import { ProductModel } from '../../../domain/model/product';
import { BaseFactory } from '../base';

export class ProductFactory extends BaseFactory {
  createProductModel(product: Products | null) {
    if (!product) return null;

    const entity = this.createModel(ProductModel, {
      ...product,
    });

    return entity;
  }

  createProductModels(products: Products[] | null) {
    if (!products) return null;

    return products.map((a) => this.createProductModel(a));
  }
}
