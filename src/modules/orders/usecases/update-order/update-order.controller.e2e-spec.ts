import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { OrderFactory } from 'test/factories/make-orders';

describe('Update order by ID (E2E)', () => {
  let app: INestApplication;
  let orderFactory: OrderFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    orderFactory = moduleRef.get(OrderFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PATCH] /orders/:id', async () => {
    const order = await orderFactory.makePrismaOrder();

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id}`)
      .send({ isFinished: true });

    const orderOnDatabase = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(orderOnDatabase.id).toEqual(order.id);
    expect(orderOnDatabase.isFinished).toEqual(true);
  });

  test('[PATCH] /orders/:id throw OrderNotFoundException', async () => {
    const orderId = randomUUID();

    const response = await request(app.getHttpServer())
      .patch(`/orders/${orderId}`)
      .send({ isFinished: true });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Order '${orderId}' not found.`);
  });
});
