import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export class ShopModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  address: string;
  @Expose()
  description: string;

  update(data: Partial<this>) {
    this.name = data.name ? data.name : this.name;
    this.address = data.address ? data.address : this.address;
    this.description = data.description ? data.description : this.description;
  }
}
