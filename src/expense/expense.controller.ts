import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() data: CreateExpenseDto) {
    return this.expenseService.create(data);
  }

  @Get()
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  findAll(@Query('year') year: number, @Query('month') month: number) {
    return this.expenseService.findAll(+month, +year);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
