import { Module } from '@nestjs/common';

import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
