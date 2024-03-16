import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InitialShop, InitialUser1, InitialUser2 } from '../../utility/const/initial';

@Injectable()
export class SeedAuthnService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  seed = async () => {
    let operations: any[] = [];

    const [users, shops] = await Promise.all([this.prisma.users.findMany(), this.prisma.shops.findMany()]);

    if (shops.length === 0) {
      operations = [
        ...operations,
        this.prisma.shops.create({
          data: InitialShop,
        }),
      ];
    }

    if (users.length === 0) {
      operations = [
        ...operations,
        this.prisma.users.create({
          data: InitialUser1,
        }),
        this.prisma.users.create({
          data: InitialUser2,
        }),
      ];
    }

    await this.prisma.$transaction(operations);
  };
}
