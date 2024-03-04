import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'libs/guard/authentication/authn.guard';
import { pathPrefixCommandUser, pathPrefixUser } from 'libs/utility/const/path.prefix';
import { CreateUserRequestDTO, LoginRequestDTO, UpdatePasswordRequestDTO } from 'libs/utility/dto';
import { RequestWithUser } from 'libs/utility/interface/request.interface';
import { UtilityImplement } from 'libs/utility/utility.module';
import { CreateUser } from '../../application/command/user/create';
import { Login } from '../../application/command/user/login';
import { Logout } from '../../application/command/user/logout';
import { UpdatePassword } from '../../application/command/user/update/password';

@ApiTags(pathPrefixUser.swagger)
@Controller(pathPrefixUser.controller)
export class UserCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus,
  ) {}

  @Post(pathPrefixCommandUser.createUser)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  async CreateUser(@Body() body: CreateUserRequestDTO): Promise<void> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new CreateUser(msg);
    await this.commandBus.execute(command);
  }

  @HttpCode(200)
  @Post(pathPrefixCommandUser.login)
  async Login(@Body() body: LoginRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new Login(msg);
    return await this.commandBus.execute(command);
  }

  @Post(pathPrefixCommandUser.updatePassword)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  async UpdatePassword(@Body() body: UpdatePasswordRequestDTO, @Res() res: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: { ...body, id: res.user.id },
    };
    const command = new UpdatePassword(msg);
    return await this.commandBus.execute(command);
  }

  @Post('/logout')
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  async Logout(@Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        token: request.token,
      },
    };
    const command = new Logout(msg);
    return await this.commandBus.execute(command);
  }
}
