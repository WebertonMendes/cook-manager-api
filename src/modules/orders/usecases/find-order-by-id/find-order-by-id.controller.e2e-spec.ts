import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { OrderFactory } from 'test/factories/make-orders';

describe('Find order by ID (E2E)', () => {
  let app: INestApplication;
  let orderFactory: OrderFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    orderFactory = moduleRef.get(OrderFactory);

    await app.init();
  });

  test('[GET] /orders/:id', async () => {
    const order = await orderFactory.makePrismaOrder();

    const response = await request(app.getHttpServer())
      .get(`/orders/${order.id}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(order.id);
  });

  test('[GET] /orders/:id throw OrderNotFoundException', async () => {
    const orderId = randomUUID();

    const response = await request(app.getHttpServer())
      .get(`/orders/${orderId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Order '${orderId}' not found.`);
  });
});
