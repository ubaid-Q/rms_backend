import { Module } from '@nestjs/common';
import { WaiterModule } from './waiter/waiter.module';
import { ConfigModule } from '@nestjs/config';
import { TablesModule } from './tables/tables.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@Shared/intercepter/response';
import { CategoriesModule } from './categories/categories.module';
import { StaffModule } from './staff/staff.module';
import { InventoryModule } from './inventory/inventory.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    WaiterModule,
    ConfigModule.forRoot(),
    TablesModule,
    OrderModule,
    MenuModule,
    CategoriesModule,
    StaffModule,
    InventoryModule,
    ExpenseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
