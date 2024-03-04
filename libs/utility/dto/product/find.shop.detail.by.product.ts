import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindShopDetailByProductRequestDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02ea' })
  @IsString()
  @IsNotEmpty()
  readonly id!: string;

  @ApiProperty({ type: String, example: '653780f1e12684704e5a02e8' })
  @IsString()
  @IsNotEmpty()
  readonly shopId!: string;
}
