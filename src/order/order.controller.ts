import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderPaymentPayload } from './dto/create-order.dto';
import { UpdateOrderItems } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a order' })
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'It retrive the orders list.' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'It retrive the orders list.' })
  getPendingOrders() {
    return this.orderService.getPendingOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'It returns the order detail.' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add a new item to existing order.' })
  addNewItems(@Param('id') id: string, @Body() data: UpdateOrderItems) {
    return this.orderService.updateItems(+id, data);
  }

  @Post(':id/pay')
  @ApiOperation({ summary: 'Pay order payment.' })
  payOrder(@Param('id') id: string, @Body() data: OrderPaymentPayload) {
    return this.orderService.payOrder(+id, data);
  }

  @Delete(':id/item/:itemId')
  @ApiOperation({ summary: 'Delete a order.' })
  remove(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.orderService.deleteItem(+id, +itemId);
  }

  @Delete(':id/cancel')
  @ApiOperation({ summary: 'cancel a order.' })
  cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(+id);
  }
}
