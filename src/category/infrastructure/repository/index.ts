import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CategoryModel } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repository';
import { CategoryFactory } from '../factory/category';

export class CategoryRepositoryImplement implements CategoryRepository {
  @Inject()
  private readonly factory: CategoryFactory;
  @Inject()
  private readonly prisma: PrismaService;

  async save(data: CategoryModel): Promise<CategoryModel> {
    const saved = await this.prisma.categories.create({ data });
    return this.factory.createCategoryModel(saved);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.categories.deleteMany({ where: { id: { in: data } } });
  }
}
