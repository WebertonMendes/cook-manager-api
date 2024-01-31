import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProductFactory } from 'test/factories/make-products';

describe('Update product by ID (E2E)', () => {
  let app: INestApplication;
  let productFactory: ProductFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProductFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    productFactory = moduleRef.get(ProductFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PATCH] /products/:id', async () => {
    const product = await productFactory.makePrismaProduct();

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send({ isActive: false });

    const productOnDatabase = await prisma.product.findUnique({
      where: {
        id: product.id,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(productOnDatabase.name).toEqual(product.name);
    expect(productOnDatabase.isActive).toEqual(false);
  });

  test('[PATCH] /products/:id throw not found', async () => {
    const productId = 'fakeProductId';

    const response = await request(app.getHttpServer())
      .patch(`/products/${productId}`)
      .send({ isActive: false });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Product '${productId}' not found.`);
  });
});
