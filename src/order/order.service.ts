import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderPaymentPayload } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus, Prisma, TableStatus } from '@prisma/client';
import { UpdateOrderItems } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(orderData: CreateOrderDto) {
    const itemQuantity = new Map();
    orderData.items.forEach((item) =>
      itemQuantity.set(item.menuItemId, item.quantity),
    );
    const items = await this.prismaService.menuItem.findMany({
      where: { id: { in: [...itemQuantity.keys()] } },
    });
    const orderItems = items.map(
      (item): Prisma.OrderItemCreateManyOrderInput => ({
        menuItemId: item.id,
        price: item.price * itemQuantity.get(item.id),
        quantity: itemQuantity.get(item.id),
      }),
    );
    const totalAmount = orderItems.reduce(
      (prev, current) => prev + current.price,
      0,
    );
    const order: Prisma.OrderCreateInput = {
      totalAmount,
      discount: 0,
      tax: 0,
      status: OrderStatus.PENDING,
      table: { connect: { id: orderData.tableId } },
      waiter: { connect: { id: orderData.waiterId } },
      items: {
        createMany: { data: orderItems },
      },
    };
    await this.prismaService.table.update({
      where: { id: orderData.tableId },
      data: { status: TableStatus.OCCUPIED },
    });
    return this.prismaService.order.create({
      data: order,
      include: { items: true },
    });
  }

  async updateItems(id: number, data: UpdateOrderItems) {
    const order = await this.prismaService.order.findUniqueOrThrow({
      where: { id },
      include: { items: true },
    });
    if (!data.items.length)
      throw new HttpException('No new Items.', HttpStatus.BAD_REQUEST);
    const orderItems = new Map();
    data.items.forEach(({ menuItemId, quantity }) =>
      orderItems.set(menuItemId, quantity),
    );
    const items = await this.prismaService.menuItem.findMany({
      where: { id: { in: [...orderItems.keys()] } },
    });
    const _orderItems = items.map((item): Prisma.OrderItemCreateManyInput => {
      const newItem = {
        orderId: order.id,
        menuItemId: item.id,
        price: item.price * orderItems.get(item.id),
        quantity: orderItems.get(item.id),
      };
      order.totalAmount += newItem.price;
      return newItem;
    });
    await this.prismaService.orderItem.createMany({ data: _orderItems });
    return this.prismaService.order.update({
      where: { id },
      data: { totalAmount: order.totalAmount },
      include: { items: { include: { menuItem: true } } },
    });
  }

  findAll() {
    return this.prismaService.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: { include: { menuItem: true } },
        waiter: true,
        payment: true,
        table: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { items: { include: { menuItem: true } } },
    });
  }

  async deleteItem(id: number, itemId: number) {
    const item = await this.prismaService.orderItem.findUniqueOrThrow({
      where: { id: itemId },
    });
    const order = await this.prismaService.order.findUniqueOrThrow({
      where: { id },
    });
    await this.prismaService.order.update({
      where: { id },
      data: { totalAmount: order.totalAmount - item.price },
    });
    return this.prismaService.orderItem.delete({
      where: { orderId: id, id: itemId },
    });
  }

  cancelOrder(id: number) {
    return this.prismaService.order.update({
      where: { id },
      data: {
        status: OrderStatus.CANCELED,
        table: { update: { status: TableStatus.AVAILABLE } },
      },
    });
  }

  payOrder(id: number, data: OrderPaymentPayload) {
    return this.prismaService.order.update({
      data: {
        payment: { create: data },
        status: OrderStatus.COMPLETED,
        table: { update: { status: TableStatus.AVAILABLE } },
      },
      include: {
        items: { include: { menuItem: true } },
        payment: true,
        table: true,
        waiter: true,
      },
      where: { id },
    });
  }

  getPendingOrders() {
    return this.prismaService.order.findMany({
      where: { status: OrderStatus.PENDING },
      include: { table: true },
    });
  }
}
