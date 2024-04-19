import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixCategory, pathPrefixQueryCategory } from 'libs/utility/const/path.prefix';
import { FindCategoryByCodeRequestDTO, FindCategoryByIdRequestDTO } from 'libs/utility/dto';
import { UtilityImplement } from 'libs/utility/utility.module';
import { FindCategoryById } from '../application/query/category/detail';
import { FindCategory } from '../application/query/category/find';
import { FindCategoryByCode } from '../application/query/category/find-by-code';
import { GetTotalCategory } from '../application/query/category/get-total';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
export class CategoryQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus,
  ) {}

  @Get(pathPrefixQueryCategory.findCategories)
  async FindCategories(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new FindCategory(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryCategory.findCategoryById)
  async FindCategoryById(@Query() query: FindCategoryByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const category = new FindCategoryById(msg);
    return await this.queryBus.execute(category);
  }

  @Get(pathPrefixQueryCategory.findCategoryByCode)
  async FindCategoryByCode(@Query() query: FindCategoryByCodeRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const category = new FindCategoryByCode(msg);
    return await this.queryBus.execute(category);
  }

  @Get(pathPrefixQueryCategory.getTotalCategory)
  @ApiHeaders([
    { name: 'x-custom-timestamp', description: 'timestamp' },
    { name: 'x-custom-nonce', description: 'nonce' },
  ])
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  async GetTotalCategory(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalCategory(msg);
    return await this.queryBus.execute(query);
  }
}
