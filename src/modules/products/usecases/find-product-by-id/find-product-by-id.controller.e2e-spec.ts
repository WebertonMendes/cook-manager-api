import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { ProductFactory } from 'test/factories/make-products';

describe('Find product by ID (E2E)', () => {
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

  test('[GET] /products/:id', async () => {
    const product = await productFactory.makePrismaProduct();

    const response = await request(app.getHttpServer())
      .get(`/products/${product.id}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(product.id);
  });

  test('[GET] /products/:id throw not found', async () => {
    const productId = 'fakeProductId';

    const response = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Product '${productId}' not found.`);
  });
});
