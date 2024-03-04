import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindCategoryByCodeRequestDTO {
  @ApiProperty({ type: String, example: 'test-code' })
  @IsString()
  @IsNotEmpty()
  readonly code!: string;
}
