import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleRequestDTO {
  @ApiProperty({ type: String, example: 'test 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty({ each: true })
  readonly permissions!: string[];

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  @IsNotEmpty()
  readonly isSuperAdmin!: boolean;
}
