import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTablePayload, UpdateTableStatusPayload } from './dto/table.dto';

@Injectable()
export class TablesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateTablePayload) {
    return this.prismaService.table.create({ data });
  }

  findAll() {
    return this.prismaService.table.findMany({ orderBy: { tableNo: 'asc' } });
  }

  find(tableNo: number) {
    return this.prismaService.table.findUnique({
      where: { tableNo },
      include: {
        orders: { include: { items: true }, orderBy: { createdAt: 'desc' } },
      },
    });
  }

  updateStatus(tableNo: number, data: UpdateTableStatusPayload) {
    return this.prismaService.table.update({
      where: { tableNo },
      data: { status: data.status },
    });
  }
}
