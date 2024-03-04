import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/prisma/prisma.service';
import { FindShop } from '../../../application/query/shop/find';
import { FindShopResult } from '../../../application/query/shop/find/result';
import { ShopQuery } from '../../../domain/query/shop';

export class ShopQueryImplement implements ShopQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async find(query: FindShop): Promise<FindShopResult> {
    const shop = await this.prisma.shops.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindShopResult, shop, {
      excludeExtraneousValues: true,
    });
  }
}
