import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { OrderItemsEntity } from '@/modules/items/entities/order-item.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { OrderEntity } from '@/modules/orders/entities/order.entity';

@Injectable()
export class OrderItemFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrderItem(
    data: Partial<OrderItemsEntity> = {},
  ): Promise<OrderItemsEntity> {
    const makeData = await makeOrderItem(data);

    await this.prisma.category.create({
      data: makeData.category,
    });

    await this.prisma.product.create({
      data: makeData.product,
    });

    await this.prisma.user.create({
      data: makeData.user,
    });

    await this.prisma.order.create({
      data: makeData.order,
    });

    await this.prisma.orderItems.create({
      data: makeData.item,
    });

    return makeData.item;
  }
}

async function makeOrderItem(override: Partial<OrderItemsEntity> = {}) {
  const category = new CategoryEntity({
    name: `${faker.commerce.department()}-${randomUUID()}`,
  });

  const product = new ProductEntity({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: new Prisma.Decimal(faker.commerce.price({ dec: 2, max: 120.99 })),
    imageUrl: faker.image.urlPlaceholder(),
    categoryId: category.id,
  });

  const user = new UserEntity({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  });

  const order = new OrderEntity({
    table: faker.number.int({ max: 100 }),
    clientId: faker.number.int({ max: 1000 }),
    userId: user.id,
    totalPrice: new Prisma.Decimal(
      faker.commerce.price({ dec: 2, max: 320.99 }),
    ),
  });

  return {
    category,
    product,
    user,
    order,
    item: new OrderItemsEntity({
      orderId: order.id,
      productId: product.id,
      quantity: faker.number.int({ max: 10 }),
      observation: faker.lorem.slug(),
      userId: user.id,
      ...override,
    }),
  };
}
