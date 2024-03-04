import { BaseCommand } from '../../base';

export class Login extends BaseCommand {
  data: {
    readonly username: string;
    readonly password: string;
  };

  constructor(data: Login) {
    super(data);
  }
}
