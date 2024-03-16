import { UserResult } from '../../../../../libs/utility/result/user.result';
import { UserModel } from '../../model/users';

export interface UserRepository {
  save: (data: UserModel) => Promise<UserModel>;
  getById: (id: string) => Promise<UserModel>;
  getByUsername: (username: string) => Promise<UserResult>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: UserModel) => Promise<UserModel>;
}
