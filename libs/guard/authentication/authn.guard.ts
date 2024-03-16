import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogLevel } from '@prisma/client';
import { Request } from 'express';
import { TIME_REQUIREMENT } from '../../utility/const/constant';
import { UtilityImplement } from '../../utility/utility.module';
import moment = require('moment');

@Injectable()
export class AuthnGuard implements CanActivate {
  constructor(private readonly util: UtilityImplement) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers['x-custom-timestamp'] || !request.headers['x-custom-nonce']) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    await this.checkReplayApi(request.headers['x-custom-timestamp'], request.headers['x-custom-nonce']);

    await this.util.setNonce(request.headers['x-custom-nonce']);

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('Authentication Required', HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = this.util.verifyAccessToken(token);
      if (!payload) throw new HttpException('Authentication Required', HttpStatus.UNAUTHORIZED);
      request['user'] = payload.user;
      request['token'] = token;
    } catch {
      const log = {
        id: this.util.generateId(),
        messageId: `unknown`,
        level: LogLevel.ERROR,
        timeStamp: moment().toDate(),
        eventName: `authenticate`,
        message: `JWT issues`,
        data: null,
      };
      await this.util.writeLog(log);
      throw new HttpException('Error Server!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async checkReplayApi(timeStamp: number, nonce: string): Promise<void> {
    if (moment().unix() - timeStamp > TIME_REQUIREMENT) {
      throw new HttpException('Expired', HttpStatus.UNAUTHORIZED);
    }
    if (await this.util.getRedisKey(nonce)) {
      throw new HttpException('Expired', HttpStatus.UNAUTHORIZED);
    }
  }
}
