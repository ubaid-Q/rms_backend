import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateExpenseDto) {
    return this.prismaService.expense.create({ data });
  }

  findAll(month?: number, year?: number) {
    const currentDate = new Date();
    currentDate.setUTCHours(23, 59, 59, 0);
    currentDate.setDate(1);
    const endDate = new Date();
    if (month && year) {
      currentDate.setFullYear(year, month - 1, 1);
      currentDate.setUTCHours(23, 59, 59, 0);
      endDate.setUTCFullYear(year, month - 1, 31);
      endDate.setUTCHours(23, 59, 59, 0);
    }
    const query: Prisma.ExpenseFindManyArgs = {
      where: { createdAt: { gte: currentDate, lte: endDate } },
    };
    return this.prismaService.expense.findMany(query);
  }

  remove(id: number) {
    return this.prismaService.expense.delete({ where: { id } });
  }
}
