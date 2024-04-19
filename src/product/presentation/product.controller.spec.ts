import { INestApplication } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'bson';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { UtilityImplement, UtilityModule } from 'libs/utility/utility.module';
import moment from 'moment';
import { FindProduct } from '../application/query/product/find';
import { FindProductById } from '../application/query/product/find-by-id';
import { FindProductByIdHandler } from '../application/query/product/find-by-id/handler';
import { FindProductHandler } from '../application/query/product/find/handler';
import { ProductQueryImplement } from '../infrastructure/query';

const mockBrandId = '507f191e810c19729de860a1';
const mockBrand = {
  id: mockBrandId,
  brandCode: `Brand-1`,
  name: `Brand 1`,
  thumbnailLink: `brand.jpg`,
  created: moment().toDate(),
};

const mockCategoryId = '507f191e810c19729de860b1';
const mockCategory = {
  id: mockCategoryId,
  categoryCode: `Category-1`,
  name: `Category 1`,
  thumbnailLink: `category.jpg`,
  created: moment().toDate(),
};

const mockProductId = '507f191e810c19729de860c1';
const productCode = Math.floor(Math.random() * 10000);
const purchase = Math.floor(Math.random() * 600 - 100);
const thumbnailLink = {
  id: new ObjectId().toString(),
  name: `image product ${productCode}`,
  url: `product-${productCode}.jpg`,
  isMain: true,
};
const qty = Math.floor(Math.random() * 5);
const created = {
  id: new ObjectId().toString(),
  username: `test`,
  at: moment().toDate(),
};
const mockProduct = [
  {
    id: mockProductId,
    productCode: `Product-${productCode}`,
    name: `Product ${productCode}`,
    price: purchase + Math.floor(Math.random() * 40 - 10),
    thumbnailLink: thumbnailLink.url,
    inStock: qty > 0 ? true : false,
  },
];
const mockProductById = {
  id: mockProductId,
  productCode: `Product-${productCode}`,
  name: `Product ${productCode}`,
  brand: mockBrand.name,
  category: mockCategory.name,
  qty,
  purchase,
  price: purchase + Math.floor(Math.random() * 40 - 10),
  thumbnailLink,
  description: `des 1`,
  images: [thumbnailLink],
  createdAt: created.at,
};

describe('ProductController', () => {
  let app: INestApplication;
  let query: ProductQueryImplement;
  let util: UtilityImplement;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, UtilityModule, PrismaModule],
      providers: [
        QueryBus,
        ProductQueryImplement,
        FindProductHandler,
        FindProduct,
        FindProductById,
        FindProductByIdHandler,
      ],
    }).compile();

    query = module.get<ProductQueryImplement>(ProductQueryImplement);
    util = module.get<UtilityImplement>(UtilityImplement);
    queryBus = module.get<QueryBus>(QueryBus);
    app = module.createNestApplication<INestApplication>();

    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should return an array of products', async () => {
    jest.spyOn(query, 'find').mockReturnValue(Promise.resolve({ items: mockProduct, total: 1 }));
    const msg = {
      messageId: util.generateId(),
      data: { offset: 0, limit: 20 },
    };
    const product = new FindProduct(msg);
    const expectedOutput = await queryBus.execute(product);
    expect(expectedOutput).toEqual({ items: mockProduct, total: 1 });
  });

  it('should return product by id', async () => {
    jest.spyOn(query, 'findById').mockReturnValue(Promise.resolve({ ...mockProductById }));
    const msg = {
      messageId: util.generateId(),
      data: { id: mockProductId },
    };
    const product = new FindProductById(msg);
    const expectedOutput = await queryBus.execute(product);
    expect(expectedOutput).toEqual({ ...mockProductById });
  });
});
