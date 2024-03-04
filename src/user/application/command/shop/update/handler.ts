import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateShop } from '.';
import { ShopRepositoryImplement } from '../../../../infrastructure/repository/shop';

@CommandHandler(UpdateShop)
export class UpdateShopHandler implements ICommandHandler<UpdateShop, any> {
  @Inject()
  private readonly shop: ShopRepositoryImplement;

  async execute(command: UpdateShop): Promise<any> {
    const { id, name, address, description } = command.data;

    const shop = await this.shop.getById(id);

    shop.update({
      name,
      address,
      description,
    });
    return await this.shop.update(shop);
  }
}
