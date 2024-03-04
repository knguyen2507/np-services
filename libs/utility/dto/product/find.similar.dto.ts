import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindProductSimilarRequestDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02da' })
  @IsString()
  @IsNotEmpty()
  readonly id!: string;
}
