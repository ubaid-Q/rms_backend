import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto implements Partial<MenuItem> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((object) => +object.value)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((object) => +object.value)
  categoriesId: number;
}
