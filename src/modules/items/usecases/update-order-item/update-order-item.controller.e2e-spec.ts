import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { $Enums } from '@prisma/client';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { OrderItemsFactory } from 'test/factories/make-order-items';

describe('Update product by ID (E2E)', () => {
  let app: INestApplication;
  let orderItemsFactory: OrderItemsFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderItemsFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    orderItemsFactory = moduleRef.get(OrderItemsFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PATCH] /orders/items/:id', async () => {
    const orderItem = await orderItemsFactory.makePrismaOrderItems();
    const statusUpdated = $Enums.OrderItemStatus.PREPARING;

    const response = await request(app.getHttpServer())
      .patch(`/orders/items/${orderItem.id}`)
      .send({ status: statusUpdated });

    const orderItemOnDatabase = await prisma.orderItems.findUnique({
      where: {
        id: orderItem.id,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(orderItemOnDatabase.id).toEqual(orderItem.id);
    expect(orderItemOnDatabase.status).toEqual(statusUpdated);
  });

  test('[PATCH] /orders/items/:id throw OrderItemNotFoundException', async () => {
    const itemId = randomUUID();

    const response = await request(app.getHttpServer())
      .patch(`/orders/items/${itemId}`)
      .send({ status: $Enums.OrderItemStatus.PREPARING });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Order item '${itemId}' not found.`);
  });
});
