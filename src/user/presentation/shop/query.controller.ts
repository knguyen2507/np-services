import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from '../../../../libs/guard/authentication/authn.guard';
import { pathPrefixQueryShop, pathPrefixShop } from '../../../../libs/utility/const/path.prefix';
import { UtilityImplement } from '../../../../libs/utility/utility.module';
import { FindShop } from '../../application/query/shop/find';

@ApiTags(pathPrefixShop.swagger)
@Controller(pathPrefixShop.controller)
@ApiHeaders([
  { name: 'x-custom-timestamp', description: 'timestamp' },
  { name: 'x-custom-nonce', description: 'nonce' },
])
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class ShopQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus,
  ) {}

  @Get(pathPrefixQueryShop.findShops)
  async FindShop(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new FindShop(msg);
    return await this.queryBus.execute(query);
  }
}
