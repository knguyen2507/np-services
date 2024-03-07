import { UserInterface } from 'libs/utility/interface/user.interface';
import { FileUpload } from 'libs/utility/type';
import { BaseCommand } from '../../base';

export class UpdateProduct extends BaseCommand {
  data: {
    readonly id: string;
    readonly name: string;
    readonly qty: number;
    readonly price: number;
    readonly description: string;
    readonly main: string;
    readonly mainId: string;
    readonly files: Array<FileUpload>;
    readonly oldImage: Array<string>;
    readonly user: UserInterface;
  };

  constructor(data: UpdateProduct) {
    super(data);
  }
}
