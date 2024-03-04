import { IQuery } from '@nestjs/cqrs';

export class BaseQuery implements IQuery {
  messageId: string;
  data: any;

  constructor(arg: BaseQuery) {
    Object.assign(this, arg);
  }
}
