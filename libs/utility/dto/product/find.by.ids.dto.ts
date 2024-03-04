import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FindProductByIdsRequestDTO {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty({ each: true })
  readonly ids!: string[];
}
