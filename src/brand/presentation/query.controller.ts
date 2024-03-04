import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixBrand, pathPrefixQueryBrand } from 'libs/utility/const/path.prefix';
import { FindBrandByCodeRequestDTO, FindBrandByIdRequestDTO } from 'libs/utility/dto';
import { UtilityImplement } from 'libs/utility/utility.module';
import { FindBrandById } from '../application/query/brand/detail';
import { FindBrand } from '../application/query/brand/find';
import { FindBrandByCode } from '../application/query/brand/find-by-code';
import { GetTotalBrand } from '../application/query/brand/get-total';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
export class BrandQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus,
  ) {}

  @Get(pathPrefixQueryBrand.findBrands)
  async FindBrands(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new FindBrand(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryBrand.findBrandById)
  async FindBrandById(@Query() query: FindBrandByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const brand = new FindBrandById(msg);
    return await this.queryBus.execute(brand);
  }

  @Get(pathPrefixQueryBrand.findBrandByCode)
  async FindBrandByCode(@Query() query: FindBrandByCodeRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const brand = new FindBrandByCode(msg);
    return await this.queryBus.execute(brand);
  }

  @Get(pathPrefixQueryBrand.getTotalBrand)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  async GetTotalBrand(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalBrand(msg);
    return await this.queryBus.execute(query);
  }
}
