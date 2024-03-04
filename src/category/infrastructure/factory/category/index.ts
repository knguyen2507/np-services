import { Categories } from '@prisma/client';
import { CategoryModel } from '../../../domain/model/category';
import { BaseFactory } from '../base';

export class CategoryFactory extends BaseFactory {
  createCategoryModel(category: Categories | null) {
    if (!category) return null;

    const entity = this.createModel(CategoryModel, {
      ...category,
    });

    return entity;
  }

  createCategoryModels(categories: Categories[] | null) {
    if (!categories) return null;

    return categories.map((a) => this.createCategoryModel(a));
  }
}
