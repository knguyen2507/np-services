import { BrandModel } from '../model/brand';

export interface BrandRepository {
  save: (data: BrandModel) => Promise<BrandModel>;
  remove: (id: string | string[]) => Promise<void>;
}
