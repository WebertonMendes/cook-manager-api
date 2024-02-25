import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { OrderItemsFactory } from 'test/factories/make-order-items';
import { OrderFactory } from 'test/factories/make-orders';

describe('Delete order by ID (E2E)', () => {
  let app: INestApplication;
  let orderFactory: OrderFactory;
  let orderItemsFactory: OrderItemsFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory, OrderItemsFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    orderFactory = moduleRef.get(OrderFactory);
    orderItemsFactory = moduleRef.get(OrderItemsFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[DELETE] /orders/:id', async () => {
    const order = await orderFactory.makePrismaOrder();

    const response = await request(app.getHttpServer())
      .delete(`/orders/${order.id}`)
      .send();

    const orderOnDatabase = await prisma.order.findUnique({
      where: { id: order.id },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(orderOnDatabase).toBeNull();
  });

  test('[DELETE] /orders/:id throw OrderNotFoundException', async () => {
    const orderId = randomUUID();

    const response = await request(app.getHttpServer())
      .delete(`/orders/${orderId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Order '${orderId}' not found.`);
  });

  test('[DELETE] /orders/:id throw OrderInProgressException', async () => {
    const orderItem = await orderItemsFactory.makePrismaOrderItems();

    const response = await request(app.getHttpServer())
      .delete(`/orders/${orderItem.orderId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toEqual(
      `Order '${orderItem.orderId}' cannot be removed as it has already in progress.`,
    );
  });

  test('[DELETE] /orders/:id throw OrderIsFinishedException', async () => {
    const order = await orderFactory.makePrismaOrder();

    await request(app.getHttpServer()).patch(`/orders/${order.id}`).send({
      isFinished: true,
    });

    const response = await request(app.getHttpServer())
      .delete(`/orders/${order.id}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toEqual(
      `Order '${order.id}' cannot be removed as it has already been finished.`,
    );
  });
});
