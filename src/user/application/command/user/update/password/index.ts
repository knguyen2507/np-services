import { BaseCommand } from '../../../base';

export class UpdatePassword extends BaseCommand {
  data: {
    id: string;
    new_pwd: string;
    current_pwd: string;
  };

  constructor(data: UpdatePassword) {
    super(data);
  }
}
