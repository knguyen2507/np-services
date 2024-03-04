import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindShopByIdRequestDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02ee' })
  @IsString()
  @IsNotEmpty()
  readonly shopId!: string;
}
