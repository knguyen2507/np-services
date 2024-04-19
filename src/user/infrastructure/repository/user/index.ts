import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../../../../libs/prisma/prisma.service';
import { UserResult } from '../../../../../libs/utility/result/user.result';
import { UserModel } from '../../../domain/model/users';
import { UserRepository } from '../../../domain/repository/user';
import { UserFactory } from '../../factory/user';

export class UserRepositoryImplement implements UserRepository {
  @Inject()
  private readonly factory: UserFactory;
  @Inject()
  private readonly prisma: PrismaService;

  async save(data: UserModel): Promise<UserModel> {
    const saved = await this.prisma.users.create({
      data,
    });
    return this.factory.createUserModel(saved);
  }

  async getById(id: string): Promise<UserModel> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    return this.factory.createUserModel(user);
  }

  async getByUsername(username: string): Promise<UserResult> {
    const user = await this.prisma.users.findFirst({
      where: { username },
    });
    if (!user) throw new HttpException('Sai tài khoản hoặc mật khẩu', HttpStatus.BAD_REQUEST);
    return plainToClass(
      UserResult,
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        username: user.username,
        password: user.password,
      },
      { excludeExtraneousValues: true },
    );
  }

  async remove(id: string | string[]): Promise<void> {
    const data = Array.isArray(id) ? id : [id];
    await this.prisma.users.deleteMany({ where: { id: { in: data } } });
  }

  async update(data: UserModel): Promise<UserModel> {
    const { id, ...model } = data;
    const updated = await this.prisma.users.update({
      data: model,
      where: { id },
    });
    return this.factory.createUserModel(updated);
  }
}
