import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindProductByCodeRequestDTO {
  @ApiProperty({ type: String, example: 'test-product-1' })
  @IsString()
  @IsNotEmpty()
  readonly productCode!: string;
}
