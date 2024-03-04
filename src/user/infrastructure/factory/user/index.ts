import { Users } from '@prisma/client';
import { UserModel } from '../../../domain/model/users';
import { BaseFactory } from '../base';

export class UserFactory extends BaseFactory {
  createUserModel(user: Users | null) {
    if (!user) return null;

    const entity = this.createModel(UserModel, {
      ...user,
    });

    return entity;
  }

  createUserModels(users: Users[] | null) {
    if (!users) return null;

    return users.map((a) => this.createUserModel(a));
  }
}
