import { ICommand } from '@nestjs/cqrs';

export class BaseCommand implements ICommand {
  messageId: string;
  data: any;

  constructor(arg: BaseCommand) {
    Object.assign(this, arg);
  }
}
