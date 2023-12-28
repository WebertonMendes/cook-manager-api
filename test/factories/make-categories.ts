import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';

@Injectable()
export class CategoryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCategory(
    data: Partial<CategoryEntity> = {},
  ): Promise<CategoryEntity> {
    const category = makeCategory(data);

    await this.prisma.category.create({
      data: category,
    });

    return category;
  }
}

function makeCategory(override: Partial<CategoryEntity> = {}) {
  return new CategoryEntity({
    name: faker.internet.userAgent(),
    ...override,
  });
}
