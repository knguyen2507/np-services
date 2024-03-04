import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindBrandByCodeRequestDTO {
  @ApiProperty({ type: String, example: 'test-code' })
  @IsString()
  @IsNotEmpty()
  readonly code!: string;
}
