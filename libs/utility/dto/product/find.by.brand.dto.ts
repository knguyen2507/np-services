import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginatorDTO } from '../paginator.dto';

export class FindProductByBrandRequestDTO extends PaginatorDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02da' })
  @IsString()
  @IsNotEmpty()
  readonly brandCode!: string;
}
