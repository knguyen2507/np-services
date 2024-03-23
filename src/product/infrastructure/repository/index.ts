import { Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProductSearchModel } from 'libs/search/search.model';
import { PrismaService } from '../../../../libs/prisma/prisma.service';
import { ProductModel } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repository';
import { ProductFactory } from '../factory/product';

export class ProductRepositoryImplement implements ProductRepository {
  @Inject()
  private readonly factory: ProductFactory;
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly elasticsearch: ElasticsearchService;

  async save(data: ProductModel): Promise<ProductModel> {
    // const [error, saved] = await this.util.handleError(
    //   this.prisma.products.create({ data })
    // );
    // if (error) {
    //   console.log(`error:::`, error);
    //   throw new HttpException(
    //     'Error Server!',
    //     HttpStatus.INTERNAL_SERVER_ERROR
    //   );
    // }
    const saved = await this.prisma.products.create({ data });
    return this.factory.createProductModel(saved);
  }

  async createSearch(data: ProductSearchModel): Promise<void> {
    const [brand, category] = await Promise.all([
      this.prisma.brands.findUnique({ where: { id: data.brandId } }),
      this.prisma.categories.findUnique({ where: { id: data.categoryId } }),
    ]);
    await this.elasticsearch.index({
      index: 'products',
      body: { ...data, brand, category },
    });
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.products.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: ProductModel): Promise<ProductModel> {
    const { id, ...saveData } = data;
    const saved = await this.prisma.products.update({
      where: { id },
      data: saveData,
    });
    return this.factory.createProductModel(saved);
  }

  async getById(id: string): Promise<ProductModel> {
    const product = await this.prisma.products.findUnique({ where: { id } });
    return this.factory.createProductModel(product);
  }

  async getByIds(id: string | string[]): Promise<ProductModel[]> {
    const data = Array.isArray(id) ? id : [id];
    const products = await this.prisma.products.findMany({
      where: { id: { in: data } },
    });
    return this.factory.createProductModels(products);
  }
}
