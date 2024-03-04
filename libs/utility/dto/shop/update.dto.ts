import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateShopRequestDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02ee' })
  @IsString()
  @IsNotEmpty()
  readonly id!: string;

  @ApiProperty({ type: String, example: 'Shop Test 1' })
  @IsString()
  @IsOptional()
  readonly name!: string;

  @ApiProperty({ type: String, example: '151 Woodland' })
  @IsString()
  @IsOptional()
  readonly address!: string;

  @ApiProperty({ type: String, example: 'Test Description' })
  @IsString()
  @IsOptional()
  readonly description!: string;
}
