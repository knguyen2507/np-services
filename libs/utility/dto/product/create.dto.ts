import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload } from 'libs/utility/type';

export class CreateProductResquestDTO {
  @ApiProperty({ type: String, example: 'test-product-1' })
  @IsString()
  @IsNotEmpty()
  readonly productCode!: string;

  @ApiProperty({ type: String, example: 'Test Product 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: String, example: '653780f1e12684704e5a02e4' })
  @IsString()
  @IsNotEmpty()
  readonly categoryId!: string;

  @ApiProperty({ type: String, example: '653780f1e12684704e5a02da' })
  @IsString()
  @IsNotEmpty()
  readonly brandId!: string;

  @ApiProperty({ type: Number, example: 3 })
  @IsString()
  @IsNotEmpty()
  readonly qty!: string;

  @ApiProperty({ type: Number, example: 200 })
  @IsString()
  @IsNotEmpty()
  readonly purchase!: string;

  @ApiProperty({ type: Number, example: 400 })
  @IsString()
  @IsNotEmpty()
  readonly price!: string;

  @ApiProperty({ type: String, example: 'Test Product 1 description' })
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @ApiProperty({ type: String, example: 'img_1.jpg' })
  @IsString()
  @IsNotEmpty()
  readonly mainImage!: string;

  @ApiProperty({ isArray: true, type: 'string', format: 'binary' })
  readonly images!: Array<FileUpload>;
}
