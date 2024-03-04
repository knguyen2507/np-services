import { UserInterface } from 'libs/utility/interface/user.interface';
import { FileUpload } from 'libs/utility/type';
import { BaseCommand } from '../../base';

export class CreateBrand extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: FileUpload;
    readonly brandCode: string;
    readonly user: UserInterface;
  };

  constructor(data: CreateBrand) {
    super(data);
  }
}
