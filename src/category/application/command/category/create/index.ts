import { UserInterface } from 'libs/utility/interface/user.interface';
import { FileUpload } from 'libs/utility/type';
import { BaseCommand } from '../../base';

export class CreateCategory extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: FileUpload;
    readonly categoryCode: string;
    readonly user: UserInterface;
  };

  constructor(data: CreateCategory) {
    super(data);
  }
}
