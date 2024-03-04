import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordRequestDTO {
  @ApiProperty({ type: String, example: 'abc12345' })
  @IsString()
  @IsNotEmpty()
  readonly new_pwd!: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly current_pwd!: string;
}
