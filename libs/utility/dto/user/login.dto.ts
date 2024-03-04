import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({ type: String, example: 'test001' })
  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
