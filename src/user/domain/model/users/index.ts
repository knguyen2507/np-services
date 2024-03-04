import { Expose } from 'class-transformer';
import { BaseModel } from '../base';

export class UserModel extends BaseModel {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  username: string;
  @Expose()
  password: string;
  @Expose()
  created: Date;

  update(data: Partial<this>) {
    this.password = data.password ? data.password : this.password;
  }
}
