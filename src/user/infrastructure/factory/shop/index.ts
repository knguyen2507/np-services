import { Shops } from '@prisma/client';
import { ShopModel } from '../../../domain/model/shops';
import { BaseFactory } from '../base';

export class ShopFactory extends BaseFactory {
  createShopModel(shop: Shops | null) {
    if (!shop) return null;

    const entity = this.createModel(ShopModel, {
      ...shop,
    });

    return entity;
  }

  createShopModels(shops: Shops[] | null) {
    if (!shops) return null;

    return shops.map((a) => this.createShopModel(a));
  }
}
