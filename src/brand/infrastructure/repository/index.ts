import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { BrandModel } from '../../domain/model/brand';
import { BrandRepository } from '../../domain/repository';
import { BrandFactory } from '../factory/brand';

export class BrandRepositoryImplement implements BrandRepository {
  @Inject()
  private readonly factory: BrandFactory;
  @Inject()
  private readonly prisma: PrismaService;

  async save(data: BrandModel): Promise<BrandModel> {
    const saved = await this.prisma.brands.create({ data });
    return this.factory.createBrandModel(saved);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.brands.deleteMany({ where: { id: { in: data } } });
  }
}
