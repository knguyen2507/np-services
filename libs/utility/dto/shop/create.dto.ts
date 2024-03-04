import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShopRequestDTO {
  @ApiProperty({ type: String, example: 'Shop Test 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String, example: '151 Woodland' })
  @IsString()
  @IsNotEmpty()
  readonly address!: string;
}
