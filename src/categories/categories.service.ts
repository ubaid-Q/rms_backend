import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prismaService.categories.create({ data });
  }

  findAll() {
    return this.prismaService.categories.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return this.prismaService.categories.delete({ where: { id } });
  }
}
