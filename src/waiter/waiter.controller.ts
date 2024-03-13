import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { CreateWaiterPayload } from './dto/create-waiter.dto';
import { UpdateWaiterDto } from './dto/update-waiter.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('waiter')
@ApiTags('Waiter')
export class WaiterController {
  constructor(private readonly waiterService: WaiterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a waiter' })
  create(@Body() data: CreateWaiterPayload) {
    return this.waiterService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the waiters' })
  findAll() {
    return this.waiterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a waiter details' })
  findOne(@Param('id') id: string) {
    return this.waiterService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a waiter ' })
  update(@Param('id') id: string, @Body() updateWaiterDto: UpdateWaiterDto) {
    return this.waiterService.update(+id, updateWaiterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a waiter' })
  remove(@Param('id') id: string) {
    return this.waiterService.remove(+id);
  }
}
