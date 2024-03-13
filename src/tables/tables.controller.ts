import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTablePayload, UpdateTableStatusPayload } from './dto/table.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tables')
@ApiTags('Tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a table' })
  create(@Body() data: CreateTablePayload) {
    console.log(data);

    return this.tablesService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the tables' })
  getAll() {
    return this.tablesService.findAll();
  }

  @Get(':tableNo')
  @ApiOperation({ summary: 'Get a table details by table number.' })
  get(@Param('tableNo') tableNo: number) {
    return this.tablesService.find(+tableNo);
  }

  @Patch(':tableNo')
  @ApiOperation({ summary: 'Update status' })
  updateStatus(
    @Param('tableNo') tableNo: number,
    @Body() data: UpdateTableStatusPayload,
  ) {
    return this.tablesService.updateStatus(+tableNo, data);
  }
}
