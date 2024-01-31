import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { ProductFactory } from 'test/factories/make-products';

describe('Find all products (E2E)', () => {
  let app: INestApplication;
  let productFactory: ProductFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProductFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    productFactory = moduleRef.get(ProductFactory);

    await app.init();
  });

  test('[GET] /products', async () => {
    const mockLimit = 10;
    let iterable = 0;

    while (iterable < mockLimit) {
      await productFactory.makePrismaProduct();
      iterable++;
    }

    const isActive = true;
    const take = 5;
    const page = 1;
    const order = 'ASC';

    const response = await request(app.getHttpServer())
      .get(
        `/products?isActive=${isActive}&take=${take}&page=${page}&order=${order}`,
      )
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.data.length).toEqual(take);
    expect(response.body.data[0].isActive).toEqual(isActive);
    expect(response.body.pagination.page).toEqual(page);
    expect(response.body.pagination.take).toEqual(take);
    expect(response.body.pagination.itemCount).toEqual(mockLimit);
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.pagination).toHaveProperty('pageCount');
    expect(response.body.pagination).toHaveProperty('hasPreviousPage');
    expect(response.body.pagination).toHaveProperty('hasNextPage');
  });
});
