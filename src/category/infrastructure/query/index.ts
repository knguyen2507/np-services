import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/prisma/prisma.service';
import { FindCategoryById } from '../../application/query/category/detail';
import { FindCategoryByIdResult } from '../../application/query/category/detail/result';
import { FindCategoryByCode } from '../../application/query/category/find-by-code';
import { FindCategoryByCodeResult } from '../../application/query/category/find-by-code/result';
import { FindCategoryResult, FindCategoryResultItem } from '../../application/query/category/find/result';
import { GetTotalCategoryResult } from '../../application/query/category/get-total/result';
import { CategoryQuery } from '../../domain/query';

export class CategoryQueryImplement implements CategoryQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async find(): Promise<FindCategoryResult> {
    const categories = await this.prisma.categories.findMany({
      orderBy: [
        {
          created: { at: 'desc' },
        },
        {
          id: 'asc',
        },
      ],
    });

    return {
      items: categories.map((i) => {
        return plainToClass(FindCategoryResultItem, i, {
          excludeExtraneousValues: true,
        });
      }),
      total: 0,
    };
  }

  async findById(query: FindCategoryById): Promise<FindCategoryByIdResult> {
    const category = await this.prisma.categories.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindCategoryByIdResult, category, {
      excludeExtraneousValues: true,
    });
  }

  async findByCode(query: FindCategoryByCode): Promise<FindCategoryByCodeResult> {
    const category = await this.prisma.categories.findUnique({
      where: { categoryCode: query.data.code },
    });

    return plainToClass(FindCategoryByCodeResult, category, {
      excludeExtraneousValues: true,
    });
  }

  async getTotal(): Promise<GetTotalCategoryResult> {
    const total = await this.prisma.categories.count();

    return plainToClass(GetTotalCategoryResult, { total }, { excludeExtraneousValues: true });
  }
}
