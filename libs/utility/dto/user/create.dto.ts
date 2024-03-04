import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDTO {
  @ApiProperty({ type: String, example: 'test 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String, example: '0123456789' })
  @IsString()
  @IsNotEmpty()
  readonly phone!: string;

  @ApiProperty({ type: String, example: 'test001' })
  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
