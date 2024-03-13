import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname.replaceAll(' ', '-')}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'It adds the item into the menu.' })
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    if (!file?.filename) {
      throw new HttpException('Image is required', HttpStatus.BAD_REQUEST);
    }
    createMenuDto.image = process.env.APP_URL + '/' + file.filename;
    return await this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Show the list of menu items.' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'It returns the detail of a menu item.' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname.replaceAll(' ', '-')}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'It updates a menu item.' })
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    if (file?.filename) {
      updateMenuDto.image = process.env.APP_URL + '/' + file.filename;
    }
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a item from menu.' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
