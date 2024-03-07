import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandResquestDTO {
  @ApiProperty({ type: String, example: 'Test Brand 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String, example: 'test-brand-1' })
  @IsString()
  @IsNotEmpty()
  readonly brandCode!: string;

  @ApiProperty({ type: String, example: 'https://www.hitachi.com/image/en/r1/common2/corp_id.png' })
  @IsString()
  @IsNotEmpty()
  readonly thumbnailLink!: string;
}
