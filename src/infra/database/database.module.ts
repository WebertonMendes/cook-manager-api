import { Module } from '@nestjs/common';

import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
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
    PrismaService,
    ProductsRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
