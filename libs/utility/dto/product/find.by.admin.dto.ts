import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginatorDTO } from '../paginator.dto';

export class FindProductByAdminRequestDTO extends PaginatorDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly searchModel?: string;
}
