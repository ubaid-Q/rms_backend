import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class Item {
  @ApiProperty()
  @IsNotEmpty()
  menuItemId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  tableId: number;

  @ApiProperty()
  @IsNotEmpty()
  waiterId: number;

  @ApiProperty({ type: Array(Item) })
  @IsArray()
  @ValidateNested()
  @Type(() => Item)
  items: Item[];
}

enum PaymentMethod {
  CASH = 'cash',
  ONLINE = 'online',
  CARD = 'card',
}

export class OrderPaymentPayload {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsOptional()
  @IsString()
  transactionId: string;
}
