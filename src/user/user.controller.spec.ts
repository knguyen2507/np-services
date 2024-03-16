import { INestApplication } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import moment from 'moment';
import { PrismaModule } from '../../libs/prisma/prisma.module';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { UtilityModule } from '../../libs/utility/utility.module';
import { UserQueryImplement } from './infrastructure/query/user';

describe('UserController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userQuery: UserQueryImplement;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, PrismaModule, UtilityModule],
      providers: [QueryBus, UserQueryImplement, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    userQuery = module.get<UserQueryImplement>(UserQueryImplement);

    app = module.createNestApplication<INestApplication>();

    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should return an array of users', async () => {
    const spy = jest.spyOn(userQuery, 'find').mockReturnValue(Promise.resolve(Users));
  });
});

const Users = {
  items: [
    {
      id: '6502d51ac4841b15cd7756a3',
      name: 'Test User 1',
      phone: '0987654321',
      username: 'admin001',
      password: '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
      created: moment().toDate(),
    },
    {
      id: '6502d51ac4841b15cd7756b3',
      name: 'Test User 2',
      phone: '0123456789',
      username: 'admin002',
      password: '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
      created: moment().toDate(),
    },
  ],
  total: 2,
};
