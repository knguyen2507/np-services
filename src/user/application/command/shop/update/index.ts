import { BaseCommand } from '../../base';

export class UpdateShop extends BaseCommand {
  data: {
    id: string;
    name: string;
    address: string;
    description: string;
  };

  constructor(data: UpdateShop) {
    super(data);
  }
}
