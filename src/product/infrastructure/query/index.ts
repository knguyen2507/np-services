import { Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../../../libs/prisma/prisma.service';
import { UtilityImplement } from '../../../../libs/utility/utility.module';
import { FindProductByCode } from '../../application/query/product/detail';
import { FindProductByCodeResult } from '../../application/query/product/detail/result';
import { FindProduct } from '../../application/query/product/find';
import { FindProductByAdmin } from '../../application/query/product/find-by-admin';
import {
  FindProductByAdminResult,
  FindProductByAdminResultItem,
} from '../../application/query/product/find-by-admin/result';
import { FindProductByBrand } from '../../application/query/product/find-by-brand';
import {
  FindProductByBrandResult,
  FindProductByBrandResultItem,
} from '../../application/query/product/find-by-brand/result';
import { FindProductByCategory } from '../../application/query/product/find-by-category';
import {
  FindProductByCategoryResult,
  FindProductByCategoryResultItem,
} from '../../application/query/product/find-by-category/result';
import { FindProductById } from '../../application/query/product/find-by-id';
import { FindProductByIdResult } from '../../application/query/product/find-by-id/result';
import { FindProductByIds } from '../../application/query/product/find-by-ids';
import { FindProductByIdsResult, FindProductByIdsResultItem } from '../../application/query/product/find-by-ids/result';
import { FindProductSameBrand } from '../../application/query/product/find-same-brand';
import {
  FindProductSameBrandResult,
  FindProductSameBrandResultItem,
} from '../../application/query/product/find-same-brand/result';
import { FindProductSameCategory } from '../../application/query/product/find-same-category';
import {
  FindProductSameCategoryResult,
  FindProductSameCategoryResultItem,
} from '../../application/query/product/find-same-category/result';
import { FindProductSamePrice } from '../../application/query/product/find-same-price';
import {
  FindProductSamePriceResult,
  FindProductSamePriceResultItem,
} from '../../application/query/product/find-same-price/result';
import { FindProductSimilar } from '../../application/query/product/find-similar';
import {
  FindProductSimilarResult,
  FindProductSimilarResultItem,
} from '../../application/query/product/find-similar/result';
import { FindProductResult, FindProductResultItem } from '../../application/query/product/find/result';
import { GetTotalProduct } from '../../application/query/product/get-total';
import { GetTotalProductResult } from '../../application/query/product/get-total/result';
import { ProductQuery } from '../../domain/query';

export class ProductQueryImplement implements ProductQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;
  @Inject()
  private readonly elasticsearch: ElasticsearchService;

  // async find(query: FindProduct): Promise<FindProductResult> {
  //   const { offset, limit, searchName } = query.data;
  //   const condition = [];
  //   if (searchName) {
  //     condition.push({ name: { contains: searchName, mode: 'insensitive' } });
  //   }

  //   const [products, total] = await Promise.all([
  //     this.prisma.products.findMany({
  //       where: { AND: condition },
  //       skip: Number(offset),
  //       take: Number(limit),
  //       orderBy: [
  //         {
  //           created: { at: 'desc' },
  //         },
  //         {
  //           id: 'asc',
  //         },
  //       ],
  //     }),
  //     this.prisma.products.count({ where: { AND: condition } }),
  //   ]);

  //   const items = products.map((i) => {
  //     return plainToClass(
  //       FindProductResultItem,
  //       {
  //         ...i,
  //         thumbnailLink: i.thumbnailLink.url,
  //         inStock: i.qty > 0 ? true : false,
  //       },
  //       { excludeExtraneousValues: true },
  //     );
  //   });

  //   return {
  //     items,
  //     total,
  //   };
  // }

  async find(query: FindProduct): Promise<FindProductResult> {
    const { offset, limit, searchName } = query.data;
    let queryString = {};
    if (searchName) {
      queryString = {
        query_string: {
          query: `*${searchName}*`,
          fields: ['name'],
        },
      };
    } else {
      queryString = {
        match_all: {},
      };
    }

    const [products, total] = await Promise.all([
      this.elasticsearch.search<any>({
        index: 'products',
        body: {
          query: queryString,
          from: Number(offset),
          size: Number(limit),
          sort: [{ 'created.at': { order: 'desc' } }],
        },
      }),
      this.elasticsearch.count({
        index: 'products',
        body: {
          query: queryString,
        },
      }),
    ]);

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductResultItem,
        {
          ...i._source,
          thumbnailLink: i._source.thumbnailLink.url,
          inStock: i._source.qty > 0 ? true : false,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: total.count,
    };
  }

  async findByAdmin(query: FindProductByAdmin): Promise<FindProductByAdminResult> {
    const { offset, limit, searchModel } = query.data;
    const conditions = [];
    const search: { [key: string]: any } = searchModel ? JSON.parse(searchModel) : undefined;

    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        if (item.isCustom) {
          if (prop === 'brand') {
            const { value } = this.util.buildSearch(item);
            const brand = await this.prisma.brands.findFirst({ where: { name: value }, select: { id: true } });
            conditions.push({ brandId: brand.id });
          }
          if (prop === 'category') {
            const { value } = this.util.buildSearch(item);
            const category = await this.prisma.categories.findFirst({ where: { name: value }, select: { id: true } });
            conditions.push({ categoryId: category.id });
          }
        } else {
          const { value } = this.util.buildSearch(item);
          if (prop === 'createdAt') {
            obj['created'] = { is: { at: value } };
            conditions.push(obj);
          } else {
            obj[prop] = value;
            conditions.push(obj);
          }
        }
      }
    }

    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where: { AND: conditions },
        include: { brand: true, category: true },
        skip: Number(offset),
        take: Number(limit),
        orderBy: [
          {
            created: { at: 'desc' },
          },
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.products.count({ where: { AND: conditions } }),
    ]);

    const items = products.map((i) => {
      return plainToClass(
        FindProductByAdminResultItem,
        {
          ...i,
          brand: i.brand.name,
          category: i.category.name,
          thumbnailLink: i.thumbnailLink.url,
          createdAt: i.created.at,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total,
    };
  }

  async findByCode(query: FindProductByCode): Promise<FindProductByCodeResult> {
    const product = await this.prisma.products.findUnique({
      where: { productCode: query.data.productCode },
      include: {
        category: true,
        brand: true,
      },
    });

    const data = {
      ...product,
      category: product.category.name,
      brand: product.brand.name,
      qtyStatus: product.qty > 0,
    };

    return plainToClass(FindProductByCodeResult, data, {
      excludeExtraneousValues: true,
    });
  }

  async findById(query: FindProductById): Promise<FindProductByIdResult> {
    const product = await this.prisma.products.findUnique({
      where: { id: query.data.id },
      include: {
        category: true,
        brand: true,
      },
    });

    const data = {
      ...product,
      category: product.category.name,
      brand: product.brand.name,
      createdAt: product.created.at,
    };

    return plainToClass(FindProductByIdResult, data, {
      excludeExtraneousValues: true,
    });
  }

  async findByBrand(query: FindProductByBrand): Promise<FindProductByBrandResult> {
    const { offset, limit, brandCode } = query.data;

    const brand = await this.prisma.brands.findUnique({ where: { brandCode }, select: { id: true } });

    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where: { brandId: brand.id },
        include: { brand: true },
        skip: Number(offset),
        take: Number(limit),
        orderBy: [
          {
            created: { at: 'desc' },
          },
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.products.count({
        where: { brandId: brand.id },
      }),
    ]);

    const items = products.map((i) => {
      return plainToClass(
        FindProductByBrandResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total,
    };
  }

  async findByCategory(query: FindProductByCategory): Promise<FindProductByCategoryResult> {
    const { offset, limit, categoryCode } = query.data;

    const category = await this.prisma.categories.findUnique({ where: { categoryCode }, select: { id: true } });

    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where: { categoryId: category.id },
        skip: Number(offset),
        take: Number(limit),
        orderBy: [
          {
            created: { at: 'desc' },
          },
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.products.count({
        where: { categoryId: category.id },
      }),
    ]);

    const items = products.map((i) => {
      return plainToClass(
        FindProductByCategoryResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTotal(query: GetTotalProduct): Promise<GetTotalProductResult> {
    const total = await this.prisma.products.count();

    return plainToClass(GetTotalProductResult, { total }, { excludeExtraneousValues: true });
  }

  // viewed products
  async findByIds(query: FindProductByIds): Promise<FindProductByIdsResult> {
    const id = query.data.ids;
    const ids = Array.isArray(id) ? id : [id];

    const products = await this.prisma.products.findMany({
      where: { productCode: { in: ids } },
    });

    const items = products.map((i) => {
      return plainToClass(
        FindProductByIdsResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: 0,
    };
  }

  async findSimilar(query: FindProductSimilar): Promise<FindProductSimilarResult> {
    const product = await this.prisma.products.findUnique({
      where: { productCode: query.data.code },
      select: {
        id: true,
        brandId: true,
        categoryId: true,
      },
    });

    const products = await this.prisma.products.findMany({
      where: {
        AND: [{ brandId: product.brandId }, { categoryId: product.categoryId }, { id: { not: product.id } }],
      },
      take: Number(20),
    });

    const items = products.map((i) => {
      return plainToClass(
        FindProductSimilarResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: 0,
    };
  }

  async findSameBrand(query: FindProductSameBrand): Promise<FindProductSameBrandResult> {
    const product = await this.prisma.products.findUnique({
      where: { productCode: query.data.code },
      select: {
        id: true,
        brandId: true,
      },
    });

    const products = await this.prisma.products.findMany({
      where: {
        AND: [{ brandId: product.brandId }, { id: { not: product.id } }],
      },
      take: Number(20),
    });

    const items = products.map((i) => {
      return plainToClass(
        FindProductSameBrandResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: 0,
    };
  }

  async findSameCategory(query: FindProductSameCategory): Promise<FindProductSameCategoryResult> {
    const product = await this.prisma.products.findUnique({
      where: { productCode: query.data.code },
      select: {
        id: true,
        categoryId: true,
      },
    });

    const products = await this.prisma.products.findMany({
      where: {
        AND: [{ categoryId: product.categoryId }, { id: { not: product.id } }],
      },
      take: Number(20),
    });

    const items = products.map((i) => {
      return plainToClass(
        FindProductSameCategoryResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: 0,
    };
  }

  async findSamePrice(query: FindProductSamePrice): Promise<FindProductSamePriceResult> {
    const product = await this.prisma.products.findUnique({
      where: { productCode: query.data.code },
      select: {
        id: true,
        categoryId: true,
        price: true,
      },
    });

    const products = await this.prisma.products.findMany({
      where: {
        AND: [
          { categoryId: product.categoryId },
          { price: { gte: product.price - 10, lt: product.price + 10 } },
          { id: { not: product.id } },
        ],
      },
      take: Number(20),
    });

    const items = products.map((i) => {
      return plainToClass(
        FindProductSamePriceResultItem,
        {
          ...i,
          thumbnailLink: i.thumbnailLink.url,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: 0,
    };
  }
}
