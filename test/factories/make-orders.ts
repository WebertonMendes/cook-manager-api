import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class OrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrder(data: Partial<OrderEntity> = {}): Promise<OrderEntity> {
    const makeData = await makeOrder(data);

    await this.prisma.user.create({
      data: makeData.user,
    });

    await this.prisma.order.create({
      data: makeData.order,
    });

    return makeData.order;
  }
}

async function makeOrder(override: Partial<OrderEntity> = {}) {
  const user = new UserEntity({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  });

  return {
    user,
    order: new OrderEntity({
      table: faker.number.int({ max: 100 }),
      clientId: faker.number.int({ max: 1000 }),
      userId: user.id,
      ...override,
    }),
  };
}
