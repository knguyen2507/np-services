import { BaseCommand } from '../../base';

export class DeleteProduct extends BaseCommand {
  data: {
    readonly ids: string[];
  };

  constructor(data: DeleteProduct) {
    super(data);
  }
}
