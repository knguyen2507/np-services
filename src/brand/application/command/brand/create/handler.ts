import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { CreateBrand } from '.';
import { BrandFactory } from '../../../../infrastructure/factory/brand';
import { BrandRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateBrand)
export class CreateBrandHandler implements ICommandHandler<CreateBrand, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly factory: BrandFactory;
  @Inject()
  private readonly Brand: BrandRepositoryImplement;

  async execute(command: CreateBrand): Promise<void> {
    const id = this.util.generateId();
    const { user, ...data } = command.data;
    const created = {
      id: user.id,
      username: user.username,
      at: moment().toDate(),
    };

    const model = await this.factory.createBrandModel({
      id,
      created,
      updated: [],
      ...data,
    });

    await this.Brand.save(model);
  }
}
