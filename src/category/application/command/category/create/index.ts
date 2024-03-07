import { UserInterface } from 'libs/utility/interface/user.interface';
import { BaseCommand } from '../../base';

export class CreateCategory extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: string;
    readonly categoryCode: string;
    readonly user: UserInterface;
  };

  constructor(data: CreateCategory) {
    super(data);
  }
}
