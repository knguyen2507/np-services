import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/prisma/prisma.service';
import { UtilityImplement } from 'libs/utility/utility.module';
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

  async find(query: FindProduct): Promise<FindProductResult> {
    const { offset, limit, searchName } = query.data;
    const condition = [];
    if (searchName) {
      condition.push({ name: { contains: searchName, mode: 'insensitive' } });
    }

    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where: { AND: condition },
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
      this.prisma.products.count({ where: { AND: condition } }),
    ]);

    const items = products.map((i) => {
      return plainToClass(
        FindProductResultItem,
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
            conditions.push({ brand: { name: value } });
          }
          if (prop === 'category') {
            const { value } = this.util.buildSearch(item);
            conditions.push({ category: { name: value } });
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
    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where: { brand: { brandCode: { equals: brandCode } } },
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
        where: { brand: { brandCode: { equals: brandCode } } },
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
    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where: { category: { categoryCode: { equals: categoryCode } } },
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
        where: { category: { categoryCode: { equals: categoryCode } } },
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

  async findByIds(query: FindProductByIds): Promise<FindProductByIdsResult> {
    const products = await this.prisma.products.findMany({
      where: { id: { in: query.data.ids } },
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
      where: { id: query.data.id },
      select: {
        id: true,
        brand: { select: { id: true } },
        category: { select: { id: true } },
      },
    });
    const products = await this.prisma.products.findMany({
      where: {
        AND: [{ brand: { id: product.brand.id } }, { category: { id: product.category.id } }],
      },
      orderBy: [
        {
          created: { at: 'desc' },
        },
        {
          id: 'asc',
        },
      ],
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
}
