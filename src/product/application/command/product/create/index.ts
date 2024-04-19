import { UserInterface } from 'libs/utility/interface/user.interface';
import { FileUpload } from 'libs/utility/type';
import { BaseCommand } from '../../base';

export class CreateProduct extends BaseCommand {
  data: {
    readonly id: string | null;
    readonly productCode: string;
    readonly name: string;
    readonly categoryId: string;
    readonly brandId: string;
    readonly qty: number;
    readonly purchase: number;
    readonly price: number;
    readonly description: string;
    readonly main: string;
    readonly files: Array<FileUpload>;
    readonly user: UserInterface;
  };

  constructor(data: CreateProduct) {
    super(data);
  }
}
