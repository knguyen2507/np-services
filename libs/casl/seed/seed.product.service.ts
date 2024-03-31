import { faker } from '@faker-js/faker';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import moment from 'moment';
import { PrismaService } from '../../prisma/prisma.service';
import { InitialUser1 } from '../../utility/const/initial';

@Injectable()
export class SeedProductService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) { }

  seed = async () => {
    const products = await this.prisma.products.findFirst();

    if (!products) {
      await this.createProduct();
    }
  };

  async createProduct() {
    let operations: any[] = [];
    const [brands, categories] = await Promise.all([this.prisma.brands.findMany(), this.prisma.categories.findMany()]);

    for (let i = 1; i <= 1000; i++) {
      const thumbnailLink = {
        id: new ObjectId().toString(),
        name: `${faker.animal.fish()}-${i}-0`,
        url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
        isMain: true,
      };
      const images = [];

      images.push(thumbnailLink);
      for (let j = 1; j < faker.number.int({ min: 2, max: 5 }); j++) {
        images.push({
          id: new ObjectId().toString(),
          name: `${faker.animal.fish()}-${i}-${j}`,
          url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
          isMain: false,
        });
      }

      let description = '';
      for (let i = 0; i < faker.number.int({ min: 2, max: 4 }); i++) {
        i === 0
          ? (description += `${faker.animal.bird()}-${i}:${faker.lorem.paragraphs({
            min: 1,
            max: 1,
          })}`)
          : (description += `*done*${faker.animal.bird()}-${i}:${faker.lorem.paragraphs({ min: 1, max: 1 })}`);
      }

      const brand = faker.helpers.arrayElement(brands);
      const category = faker.helpers.arrayElement(categories);
      const purchase = faker.number.int({ min: 100, max: 500 });

      const data = {
        id: new ObjectId().toString(),
        name: `${category.name} ${brand.name} ${i}`,
        productCode: `test-product-${i}`,
        categoryId: category.id,
        brandId: brand.id,
        qty: faker.number.int({ min: 0, max: 5 }),
        purchase,
        price: purchase + faker.number.int({ min: 10, max: 50 }),
        thumbnailLink,
        description,
        images,
        created: {
          id: InitialUser1.id,
          username: InitialUser1.username,
          at: moment().toDate(),
        },
        updated: [],
      };

      operations = [
        ...operations,
        this.prisma.products.create({ data }),
      ];
    }

    await this.prisma.$transaction(operations);
  }
}
