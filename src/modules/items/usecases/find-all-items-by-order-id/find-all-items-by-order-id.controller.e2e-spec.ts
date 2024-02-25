import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { OrderItemsFactory } from 'test/factories/make-order-items';

describe('Find All Order Items by order id (E2E)', () => {
  let app: INestApplication;
  let orderItemFactory: OrderItemsFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderItemsFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    orderItemFactory = moduleRef.get(OrderItemsFactory);

    await app.init();
  });

  test('[GET] /orders/items/:id', async () => {
    const orderItem = await orderItemFactory.makePrismaOrderItems();

    const response = await request(app.getHttpServer())
      .get(`/orders/items/${orderItem.orderId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.id).toEqual(orderItem.orderId);
    expect(response.body.userId).toEqual(orderItem.userId);
    expect(response.body.isFinished).toEqual(false);
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('items');
    expect(response.body.items).length(1);
    expect(response.body.items[0].productId).toEqual(orderItem.productId);
    expect(response.body.items[0]).toHaveProperty('productName');
    expect(response.body.items[0]).toHaveProperty('price');
    expect(response.body.items[0]).toHaveProperty('totalPrice');
    expect(response.body.items[0]).toHaveProperty('createdAt');
    expect(response.body.items[0]).toHaveProperty('updatedAt');
  });

  test('[GET] /orders/items/:id throw OrderNotFoundException', async () => {
    const orderId = randomUUID();

    const response = await request(app.getHttpServer())
      .get(`/orders/items/${orderId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Order '${orderId}' not found.`);
  });
});
