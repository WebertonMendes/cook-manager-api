import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';

@Injectable()
export class ProductFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProduct(
    data: Partial<ProductEntity> = {},
  ): Promise<ProductEntity> {
    const makeData = await makeProduct(data);

    await this.prisma.category.create({
      data: makeData.category,
    });

    await this.prisma.product.create({
      data: makeData.product,
    });

    return makeData.product;
  }
}

async function makeProduct(override: Partial<ProductEntity> = {}) {
  const category = new CategoryEntity({
    name: faker.commerce.department(),
  });

  return {
    category,
    product: new ProductEntity({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: new Prisma.Decimal(faker.commerce.price()),
      imageUrl: faker.image.urlPlaceholder(),
      categoryId: category.id,
      ...override,
    }),
  };
}
