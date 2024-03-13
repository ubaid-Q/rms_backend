import { Injectable } from '@nestjs/common';
import { UpdateWaiterDto } from './dto/update-waiter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWaiterPayload } from './dto/create-waiter.dto';

@Injectable()
export class WaiterService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateWaiterPayload) {
    return this.prismaService.waiter.create({ data });
  }

  findAll() {
    return this.prismaService.waiter.findMany();
  }

  findOne(id: number) {
    return this.prismaService.waiter.findFirstOrThrow({ where: { id } });
  }

  update(id: number, data: UpdateWaiterDto) {
    return this.prismaService.waiter.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prismaService.waiter.delete({ where: { id } });
  }
}
