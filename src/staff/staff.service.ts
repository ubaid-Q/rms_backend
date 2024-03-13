import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateStaffDto) {
    return this.prismaService.staff.create({ data });
  }

  findAll() {
    return this.prismaService.staff.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return this.prismaService.staff.delete({ where: { id } });
  }
}
