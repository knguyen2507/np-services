import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { InitialBrand, InitialCategory } from 'libs/utility/const/initial';

@Injectable()
export class SeedShopService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  seed = async () => {
    let operations: any[] = [];

    const [brands, categories] = await Promise.all([this.prisma.brands.findMany(), this.prisma.categories.findMany()]);

    if (brands.length === 0) {
      for (const brand of InitialBrand) {
        operations = [
          ...operations,
          this.prisma.brands.create({
            data: brand,
          }),
        ];
      }
    }

    if (categories.length === 0) {
      for (const categories of InitialCategory) {
        operations = [
          ...operations,
          this.prisma.categories.create({
            data: categories,
          }),
        ];
      }
    }

    await this.prisma.$transaction(operations);
  };
}
