import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { OrderFactory } from 'test/factories/make-orders';

describe('Find all orders (E2E)', () => {
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

  test('[GET] /orders', async () => {
    const mockLimit = 10;
    let iterable = 0;

    while (iterable < mockLimit) {
      await orderFactory.makePrismaOrder();
      iterable++;
    }

    const isFinished = false;
    const take = 5;
    const page = 1;
    const order = 'ASC';

    const response = await request(app.getHttpServer())
      .get(
        `/orders?isActive=${isFinished}&take=${take}&page=${page}&order=${order}`,
      )
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.data.length).toEqual(take);
    expect(response.body.data[0].isFinished).toEqual(isFinished);
    expect(response.body.pagination.page).toEqual(page);
    expect(response.body.pagination.take).toEqual(take);
    expect(response.body.pagination.itemCount).toEqual(mockLimit);
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.pagination).toHaveProperty('pageCount');
    expect(response.body.pagination).toHaveProperty('hasPreviousPage');
    expect(response.body.pagination).toHaveProperty('hasNextPage');
  });
});
