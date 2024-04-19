import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixBrand, pathPrefixCommandBrand } from 'libs/utility/const/path.prefix';
import { CreateBrandResquestDTO } from 'libs/utility/dto';
import { RequestWithUser } from 'libs/utility/interface/request.interface';
import { UtilityImplement } from 'libs/utility/utility.module';
import { CreateBrand } from '../application/command/brand/create';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
@ApiHeaders([
  { name: 'x-custom-timestamp', description: 'timestamp' },
  { name: 'x-custom-nonce', description: 'nonce' },
])
@UseGuards(AuthnGuard)
export class BrandCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus,
  ) {}

  @Post(pathPrefixCommandBrand.createBrand)
  async CreateBrand(@Body() body: CreateBrandResquestDTO, @Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: body.thumbnailLink,
        brandCode: body.brandCode,
        user: request.user,
      },
    };
    const command = new CreateBrand(msg);
    return await this.commandBus.execute(command);
  }
}
