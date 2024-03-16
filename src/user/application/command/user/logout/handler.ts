import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogLevel } from '@prisma/client';
import moment from 'moment';
import { Logout } from '.';
import { UtilityImplement } from '../../../../../../libs/utility/utility.module';

@CommandHandler(Logout)
export class LogoutHandler implements ICommandHandler<Logout, any> {
  constructor(private readonly util: UtilityImplement) {}

  async execute(command: Logout): Promise<any> {
    const token = command.data.token;
    try {
      await Promise.all([
        this.util.deleteRefreshToken(token),
        this.util.setBlackListToken(`blacklist:${token}`, token),
      ]);
    } catch (error) {
      const log = {
        id: this.util.generateId(),
        messageId: command.messageId,
        level: LogLevel.ERROR,
        timeStamp: moment().toDate(),
        eventName: `logout`,
        message: error,
        data: command.data,
      };
      await this.util.writeLog(log);
      throw new HttpException('Error Server!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
