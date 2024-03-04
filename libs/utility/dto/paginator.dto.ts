import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginatorDTO {
  @ApiProperty({ type: Number, example: 0 })
  @Type(() => Number)
  @IsNumber()
  readonly offset!: number;

  @ApiProperty({ type: Number, example: 20 })
  @Type(() => Number)
  @IsNumber()
  readonly limit!: number;
}
