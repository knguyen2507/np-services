import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { ShopModel } from '../../../domain/model/shops';
import { ShopRepository } from '../../../domain/repository/shop';
import { ShopFactory } from '../../factory/shop';

export class ShopRepositoryImplement implements ShopRepository {
  @Inject()
  private readonly factory: ShopFactory;
  @Inject()
  private readonly prisma: PrismaService;

  async save(data: ShopModel): Promise<ShopModel> {
    const saved = await this.prisma.shops.create({ data });
    return this.factory.createShopModel(saved);
  }

  async getById(id: string): Promise<ShopModel> {
    const shop = await this.prisma.shops.findUnique({
      where: { id },
    });
    return this.factory.createShopModel(shop);
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.shops.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: ShopModel): Promise<ShopModel> {
    const { id, ...model } = data;
    const updated = await this.prisma.shops.update({
      data: model,
      where: { id },
    });
    return this.factory.createShopModel(updated);
  }
}
