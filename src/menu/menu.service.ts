import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateMenuDto) {
    await this.prismaService.categories.findUniqueOrThrow({
      where: { id: data.categoriesId },
    });
    return await this.prismaService.menuItem.create({
      data,
      include: { category: true },
    });
  }

  findAll() {
    return this.prismaService.menuItem.findMany({
      include: { category: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.menuItem.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, data: UpdateMenuDto) {
    return this.prismaService.menuItem.update({ data, where: { id } });
  }

  remove(id: number) {
    return this.prismaService.menuItem.delete({ where: { id } });
  }
}
