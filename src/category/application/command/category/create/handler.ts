import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { CreateCategory } from '.';
import { CategoryFactory } from '../../../../infrastructure/factory/category';
import { CategoryRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateCategory)
export class CreateCategoryHandler implements ICommandHandler<CreateCategory, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly factory: CategoryFactory;
  @Inject()
  private readonly category: CategoryRepositoryImplement;

  async execute(command: CreateCategory): Promise<void> {
    const id = this.util.generateId();
    const { user, ...data } = command.data;
    const created = {
      id: user.id,
      username: user.username,
      at: moment().toDate(),
    };

    const model = await this.factory.createCategoryModel({
      id,
      created,
      updated: [],
      ...data,
    });

    await this.category.save(model);
  }
}
