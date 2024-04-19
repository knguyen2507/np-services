import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixCategory, pathPrefixCommandCategory } from 'libs/utility/const/path.prefix';
import { CreateCategoryResquestDTO } from 'libs/utility/dto';
import { RequestWithUser } from 'libs/utility/interface/request.interface';
import { UtilityImplement } from 'libs/utility/utility.module';
import { CreateCategory } from '../application/command/category/create';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
@ApiHeaders([
  { name: 'x-custom-timestamp', description: 'timestamp' },
  { name: 'x-custom-nonce', description: 'nonce' },
])
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class CategoryCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus,
  ) {}

  @Post(pathPrefixCommandCategory.createCategory)
  async CreateCategory(@Body() body: CreateCategoryResquestDTO, @Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: body.thumbnailLink,
        categoryCode: body.categoryCode,
        user: request.user,
      },
    };
    const command = new CreateCategory(msg);
    return await this.commandBus.execute(command);
  }
}
