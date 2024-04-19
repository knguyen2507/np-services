import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from '../../../../libs/guard/authentication/authn.guard';
import { pathPrefixCommandShop, pathPrefixShop } from '../../../../libs/utility/const/path.prefix';
import { UpdateShopRequestDTO } from '../../../../libs/utility/dto';
import { UtilityImplement } from '../../../../libs/utility/utility.module';
import { UpdateShop } from '../../application/command/shop/update';

@ApiTags(pathPrefixShop.swagger)
@Controller(pathPrefixShop.controller)
@ApiHeaders([
  { name: 'x-custom-timestamp', description: 'timestamp' },
  { name: 'x-custom-nonce', description: 'nonce' },
])
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class ShopCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus,
  ) {}

  @Post(pathPrefixCommandShop.updateShop)
  async UpdateShop(@Body() body: UpdateShopRequestDTO): Promise<void> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new UpdateShop(msg);
    await this.commandBus.execute(command);
  }
}
