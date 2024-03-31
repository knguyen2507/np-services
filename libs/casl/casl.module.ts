import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeedAuthnService } from './seed/seed.authn.service';
import { SeedProductService } from './seed/seed.product.service';
import { SeedShopService } from './seed/seed.shop.services';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [SeedAuthnService, SeedShopService, SeedProductService],
  exports: [],
})
export class CaslModule implements OnModuleInit {
  constructor(
    @Inject(SeedAuthnService) private seedAuthnService: SeedAuthnService,
    @Inject(SeedShopService) private seedShopService: SeedShopService,
    @Inject(SeedProductService) private seedProductService: SeedProductService,
  ) { }
  async onModuleInit() {
    await this.seedAuthnService.seed();
    await this.seedShopService.seed();
    await this.seedProductService.seed();
  }
}
