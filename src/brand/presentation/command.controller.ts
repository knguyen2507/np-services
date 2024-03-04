import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { pathPrefixBrand, pathPrefixCommandBrand } from 'libs/utility/const/path.prefix';
import { CreateBrandResquestDTO } from 'libs/utility/dto';
import { RequestWithUser } from 'libs/utility/interface/request.interface';
import { FileUpload } from 'libs/utility/type';
import { UtilityImplement } from 'libs/utility/utility.module';
import { CreateBrand } from '../application/command/brand/create';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
export class BrandCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus,
  ) {}

  @Post(pathPrefixCommandBrand.createBrand)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateBrand(
    @UploadedFile() image: FileUpload,
    @Body() body: CreateBrandResquestDTO,
    @Req() request: RequestWithUser,
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        brandCode: body.brandCode,
        user: request.user,
      },
    };
    const command = new CreateBrand(msg);
    return await this.commandBus.execute(command);
  }
}
