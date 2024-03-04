import { BaseCommand } from '../../base';

export class Logout extends BaseCommand {
  data: {
    token: string;
  };

  constructor(data: Logout) {
    super(data);
  }
}
