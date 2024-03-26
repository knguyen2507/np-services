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

  async find(query: FindProduct): Promise<FindProductResult> {
    const { offset, limit, searchName, searchType, searchValue } = query.data;
    let queryString = {};
    if (searchName) {
      const conditions = [];

      conditions.push({
        query_string: {
          query: `*${searchName}*`,
          fields: ['name'],
        },
      });

      if (searchType && searchValue) {
        let data;
        if (searchType === 'brand') {
          data = await this.prisma.brands.findUnique({ where: { brandCode: searchValue }, select: { id: true } });
          conditions.push({ match: { brandId: data.id } });
        } else {
          data = await this.prisma.categories.findUnique({
            where: { categoryCode: searchValue },
            select: { id: true },
          });
          conditions.push({ match: { categoryId: data.id } });
        }
      }

      queryString = {
        bool: {
          must: conditions,
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
        if (item.isCustom) {
          if (prop === 'brand') {
            const { value } = this.util.buildSearch(item);
            const brand = await this.prisma.brands.findFirst({ where: { name: value }, select: { id: true } });
            conditions.push({ match: { brandId: brand.id } });
          }
          if (prop === 'category') {
            const { value } = this.util.buildSearch(item);
            const category = await this.prisma.categories.findFirst({ where: { name: value }, select: { id: true } });
            conditions.push({ match: { categoryId: category.id } });
          }
        } else {
          if (prop === 'createdAt') {
            const { value } = this.util.buildSearch2('created.at', item);
            conditions.push(value);
          } else {
            const { value } = this.util.buildSearch2(prop, item);
            conditions.push(value);
          }
        }
      }
    }

    const [products, total] = await Promise.all([
      this.elasticsearch.search<any>({
        index: 'products',
        body: {
          query: { bool: { must: conditions } },
          from: Number(offset),
          size: Number(limit),
          sort: [{ 'created.at': { order: 'desc' } }],
        },
      }),
      this.elasticsearch.count({
        index: 'products',
        body: {
          query: { bool: { must: conditions } },
        },
      }),
    ]);

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductByAdminResultItem,
        {
          ...i._source,
          brand: i._source.brand.name,
          category: i._source.category.name,
          thumbnailLink: i._source.thumbnailLink.url,
          createdAt: i._source.created.at,
        },
        { excludeExtraneousValues: true },
      );
    });

    return {
      items,
      total: total.count,
    };
  }

  async findByCode(query: FindProductByCode): Promise<FindProductByCodeResult> {
    const product = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: { match: { productCode: query.data.productCode } },
      },
    });

    const data = {
      ...product.hits.hits[0]._source,
      category: product.hits.hits[0]._source.category.name,
      brand: product.hits.hits[0]._source.brand.name,
      qtyStatus: product.hits.hits[0]._source.qty > 0,
    };

    return plainToClass(FindProductByCodeResult, data, {
      excludeExtraneousValues: true,
    });
  }

  async findById(query: FindProductById): Promise<FindProductByIdResult> {
    const product = await this.elasticsearch.get<any>({
      index: 'products',
      id: query.data.id,
    });

    const data = {
      ...product._source,
      category: product._source.category.name,
      brand: product._source.brand.name,
      createdAt: product._source.created.at,
    };

    return plainToClass(FindProductByIdResult, data, {
      excludeExtraneousValues: true,
    });
  }

  async findByBrand(query: FindProductByBrand): Promise<FindProductByBrandResult> {
    const { offset, limit, brandCode } = query.data;

    const brand = await this.prisma.brands.findUnique({ where: { brandCode }, select: { id: true } });

    const [products, total] = await Promise.all([
      this.elasticsearch.search<any>({
        index: 'products',
        body: {
          query: { match: { brandId: brand.id } },
          from: Number(offset),
          size: Number(limit),
          sort: [{ 'created.at': { order: 'desc' } }],
        },
      }),
      this.elasticsearch.count({
        index: 'products',
        body: {
          query: { match: { brandId: brand.id } },
        },
      }),
    ]);

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductByBrandResultItem,
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

  async findByCategory(query: FindProductByCategory): Promise<FindProductByCategoryResult> {
    const { offset, limit, categoryCode } = query.data;

    const category = await this.prisma.categories.findUnique({ where: { categoryCode }, select: { id: true } });

    const [products, total] = await Promise.all([
      this.elasticsearch.search<any>({
        index: 'products',
        body: {
          query: { match: { categoryId: category.id } },
          from: Number(offset),
          size: Number(limit),
          sort: [{ 'created.at': { order: 'desc' } }],
        },
      }),
      this.elasticsearch.count({
        index: 'products',
        body: {
          query: { match: { categoryId: category.id } },
        },
      }),
    ]);

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductByCategoryResultItem,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTotal(query: GetTotalProduct): Promise<GetTotalProductResult> {
    // const total = await this.prisma.products.count();
    const total = await this.elasticsearch.count({ index: 'products' });

    return plainToClass(GetTotalProductResult, { total: total.count }, { excludeExtraneousValues: true });
  }

  // viewed products
  async findByIds(query: FindProductByIds): Promise<FindProductByIdsResult> {
    const id = query.data.ids;
    const ids = Array.isArray(id) ? id : [id];

    const products = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        size: Number(ids.length),
        query: {
          bool: {
            must: ids.map((id) => ({
              match: { productCode: id },
            })),
          },
        },
      },
    });

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductByIdsResultItem,
        {
          ...i._source,
          thumbnailLink: i._source.thumbnailLink.url,
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
    const data = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: { match: { productCode: query.data.code } },
      },
    });

    const product = {
      id: data.hits.hits[0]._source.id,
      brandId: data.hits.hits[0]._source.brandId,
      categoryId: data.hits.hits[0]._source.categoryId,
    };

    const products = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: {
          bool: {
            must: [{ match: { brandId: product.brandId } }, { match: { categoryId: product.categoryId } }],
            must_not: [{ match: { id: product.id } }],
          },
        },
        size: 20,
      },
    });

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductSimilarResultItem,
        {
          ...i._source,
          thumbnailLink: i._source.thumbnailLink.url,
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
    const data = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: { match: { productCode: query.data.code } },
      },
    });

    const product = {
      id: data.hits.hits[0]._source.id,
      brandId: data.hits.hits[0]._source.brandId,
    };

    const products = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: {
          bool: {
            must: [{ match: { brandId: product.brandId } }],
            must_not: [{ match: { id: product.id } }],
          },
        },
        size: 20,
      },
    });

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductSameBrandResultItem,
        {
          ...i._source,
          thumbnailLink: i._source.thumbnailLink.url,
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
    const data = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: { match: { productCode: query.data.code } },
      },
    });

    const product = {
      id: data.hits.hits[0]._source.id,
      categoryId: data.hits.hits[0]._source.categoryId,
    };

    const products = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: {
          bool: {
            must: [{ match: { categoryId: product.categoryId } }],
            must_not: [{ match: { id: product.id } }],
          },
        },
        size: 20,
      },
    });

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductSameCategoryResultItem,
        {
          ...i._source,
          thumbnailLink: i._source.thumbnailLink.url,
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
    const data = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: { match: { productCode: query.data.code } },
      },
    });

    const product = {
      id: data.hits.hits[0]._source.id,
      price: data.hits.hits[0]._source.price,
      categoryId: data.hits.hits[0]._source.categoryId,
    };

    const products = await this.elasticsearch.search<any>({
      index: 'products',
      body: {
        query: {
          bool: {
            must: [
              { match: { categoryId: product.categoryId } },
              { range: { price: { gte: product.price - 10, lte: product.price + 10 } } },
            ],
            must_not: [{ match: { id: product.id } }],
          },
        },
        size: 20,
      },
    });

    const items = products.hits.hits.map((i) => {
      return plainToClass(
        FindProductSamePriceResultItem,
        {
          ...i._source,
          thumbnailLink: i._source.thumbnailLink.url,
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
