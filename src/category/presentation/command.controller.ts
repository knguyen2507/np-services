import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixCategory, pathPrefixCommandCategory } from 'libs/utility/const/path.prefix';
import { CreateCategoryResquestDTO } from 'libs/utility/dto';
import { RequestWithUser } from 'libs/utility/interface/request.interface';
import { FileUpload } from 'libs/utility/type';
import { UtilityImplement } from 'libs/utility/utility.module';
import { CreateCategory } from '../application/command/category/create';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class CategoryCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus,
  ) {}

  @Post(pathPrefixCommandCategory.createCategory)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateCategory(
    @UploadedFile() image: FileUpload,
    @Body() body: CreateCategoryResquestDTO,
    @Req() request: RequestWithUser,
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        categoryCode: body.categoryCode,
        user: request.user,
      },
    };
    const command = new CreateCategory(msg);
    return await this.commandBus.execute(command);
  }
}
