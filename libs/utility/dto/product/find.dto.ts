import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginatorDTO } from '../paginator.dto';

export class FindProductRequestDTO extends PaginatorDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly searchName?: string;
}
