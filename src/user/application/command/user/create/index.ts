import { BaseCommand } from '../../base';

export class CreateUser extends BaseCommand {
  data: {
    readonly name: string;
    readonly phone: string;
    readonly username: string;
    readonly password: string;
  };

  constructor(data: CreateUser) {
    super(data);
  }
}
