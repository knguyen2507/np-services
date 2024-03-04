import { IsString } from 'class-validator';
import { UserInterface } from './user.interface';

export class ShopInterface extends UserInterface {
  @IsString()
  readonly shopIds!: string[];
}
