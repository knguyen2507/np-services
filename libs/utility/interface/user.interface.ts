import { IsString } from 'class-validator';

export class UserInterface {
  @IsString()
  readonly id!: string;
  @IsString()
  readonly name!: string;
  @IsString()
  readonly phone!: string;
  @IsString()
  readonly username!: string;
  @IsString()
  readonly password!: string;
  @IsString()
  readonly roleId!: string;
}
