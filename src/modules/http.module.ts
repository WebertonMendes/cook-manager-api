import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './items/order-items.module';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    OrderItemsModule,
  ],
})
export class HttpModule {}
