import { ShopModel } from '../../model/shops';

export interface ShopRepository {
  save: (data: ShopModel) => Promise<ShopModel>;
  getById: (id: string) => Promise<ShopModel>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: ShopModel) => Promise<ShopModel>;
}
