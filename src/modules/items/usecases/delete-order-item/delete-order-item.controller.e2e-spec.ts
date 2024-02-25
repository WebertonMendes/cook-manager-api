import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { OrderItemsFactory } from 'test/factories/make-order-items';

describe('Delete orderItem by ID (E2E)', () => {
  let app: INestApplication;
  let orderItemFactory: OrderItemsFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderItemsFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    orderItemFactory = moduleRef.get(OrderItemsFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[DELETE] /orders/items/:id', async () => {
    const orderItem = await orderItemFactory.makePrismaOrderItems();

    const response = await request(app.getHttpServer())
      .delete(`/orders/items/${orderItem.id}`)
      .send();

    const orderItemOnDatabase = await prisma.orderItems.findUnique({
      where: {
        id: orderItem.id,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(orderItemOnDatabase).toBeNull();
  });

  test('[DELETE] /orders/items/:id throw OrderItemNotFoundException', async () => {
    const itemId = randomUUID();

    const response = await request(app.getHttpServer())
      .delete(`/orders/items/${itemId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Order item '${itemId}' not found.`);
  });
});
