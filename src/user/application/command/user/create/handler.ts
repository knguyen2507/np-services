import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { CreateUser } from '.';
import { UserFactory } from '../../../../infrastructure/factory/user';
import { UserRepositoryImplement } from '../../../../infrastructure/repository/user';

@CommandHandler(CreateUser)
export class CreateUserHandler implements ICommandHandler<CreateUser, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly factory: UserFactory;
  @Inject()
  private readonly user: UserRepositoryImplement;

  async execute(command: CreateUser): Promise<void> {
    const created = moment().toDate();
    const { password, ...data } = command.data;

    const [id, hashPwd] = [this.util.generateId(), this.util.passwordHash(password)];

    // create new user
    const model = await this.factory.createUserModel({
      ...data,
      password: hashPwd,
      created,
      id,
    });

    await this.user.save(model);
  }
}
