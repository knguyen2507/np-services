import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteProductResquestDTO {
  @ApiProperty({
    example: ['653780f1e12684704e5a02fd', '653780f1e12684704e5a02fe'],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly ids!: string[];
}
