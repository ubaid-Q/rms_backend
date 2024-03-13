import { Module } from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { WaiterController } from './waiter.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WaiterController],
  providers: [WaiterService, PrismaService],
})
export class WaiterModule {}
