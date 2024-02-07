import { Module } from '@nestjs/common';

import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';
import { OrderItemsRepository } from '@/modules/items/repositories/order-items.repository';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories.repository';
import { PrismaOrderItemsRepository } from './prisma/repositories/prisma-order-items.repository';
import { PrismaOrdersRepository } from './prisma/repositories/prisma-orders.repository';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
    {
      provide: OrderItemsRepository,
      useClass: PrismaOrderItemsRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    CategoriesRepository,
    OrdersRepository,
    OrderItemsRepository,
    PrismaService,
    ProductsRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
