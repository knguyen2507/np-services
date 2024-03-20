import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindProductByIdsRequestDTO {
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  readonly ids!: string | string[];
}
