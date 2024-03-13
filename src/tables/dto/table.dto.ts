import { ApiProperty } from '@nestjs/swagger';
import { TableStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTablePayload {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tableNo: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacity?: number;
}

export class UpdateTableStatusPayload {
  @ApiProperty({ default: TableStatus.AVAILABLE })
  @IsEnum(TableStatus)
  @IsNotEmpty()
  status: TableStatus;
}
