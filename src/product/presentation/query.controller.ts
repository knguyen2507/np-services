import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixProduct, pathPrefixQueryProduct } from 'libs/utility/const/path.prefix';
import {
  FindProductByAdminRequestDTO,
  FindProductByBrandRequestDTO,
  FindProductByCategoryRequestDTO,
  FindProductByCodeRequestDTO,
  FindProductByIdRequestDTO,
  FindProductByIdsRequestDTO,
  FindProductRequestDTO,
  FindProductSameBrandRequestDTO,
  FindProductSameCategoryRequestDTO,
  FindProductSamePriceRequestDTO,
  FindProductSimilarRequestDTO,
} from 'libs/utility/dto';
import { UtilityImplement } from 'libs/utility/utility.module';
import { FindProductByCode } from '../application/query/product/detail';
import { FindProduct } from '../application/query/product/find';
import { FindProductByAdmin } from '../application/query/product/find-by-admin';
import { FindProductByBrand } from '../application/query/product/find-by-brand';
import { FindProductByCategory } from '../application/query/product/find-by-category';
import { FindProductById } from '../application/query/product/find-by-id';
import { FindProductByIds } from '../application/query/product/find-by-ids';
import { FindProductSameBrand } from '../application/query/product/find-same-brand';
import { FindProductSameCategory } from '../application/query/product/find-same-category';
import { FindProductSamePrice } from '../application/query/product/find-same-price';
import { FindProductSimilar } from '../application/query/product/find-similar';
import { GetTotalProduct } from '../application/query/product/get-total';

@ApiTags(pathPrefixProduct.swagger)
@Controller(pathPrefixProduct.controller)
export class ProductQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus,
  ) {}

  @Get(pathPrefixQueryProduct.findProductListByAdmin)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  @ApiHeaders([
    { name: 'x-custom-timestamp', description: 'timestamp' },
    { name: 'x-custom-nonce', description: 'nonce' },
  ])
  async FindProductListByAdmin(@Query() query: FindProductByAdminRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByAdmin(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProducts)
  async FindProducts(@Query() query: FindProductRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProduct(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByCode)
  async FindProductByCode(@Query() query: FindProductByCodeRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByCode(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductById)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  @ApiHeaders([
    { name: 'x-custom-timestamp', description: 'timestamp' },
    { name: 'x-custom-nonce', description: 'nonce' },
  ])
  async FindProductById(@Query() query: FindProductByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductById(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByBrand)
  async FindProductByBrand(@Query() query: FindProductByBrandRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByBrand(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByCategory)
  async FindProductByCategory(@Query() query: FindProductByCategoryRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByCategory(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByIds)
  async FindProductByIds(@Query() query: FindProductByIdsRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByIds(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductSimilar)
  async FindProductSimilar(@Query() query: FindProductSimilarRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductSimilar(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductSameBrand)
  async FindProductSameBrand(@Query() query: FindProductSameBrandRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductSameBrand(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductSameCategory)
  async FindProductSameCategory(@Query() query: FindProductSameCategoryRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductSameCategory(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductSamePrice)
  async FindProductSameprice(@Query() query: FindProductSamePriceRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductSamePrice(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.getTotalProduct)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  @ApiHeaders([
    { name: 'x-custom-timestamp', description: 'timestamp' },
    { name: 'x-custom-nonce', description: 'nonce' },
  ])
  async GetTotalProduct(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalProduct(msg);
    return await this.queryBus.execute(query);
  }
}
