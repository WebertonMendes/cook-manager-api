import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create product (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /products', async () => {
    await request(app.getHttpServer()).post('/categories').send({
      name: 'Drinks',
    });

    const category = await prisma.category.findUnique({
      where: {
        name: 'Drinks',
      },
    });

    const productData = {
      name: 'Product Name',
      description: 'Product Description',
      price: 10.99,
      imageUrl: 'https://mysite.com/images/product001.png',
      categoryId: category.id,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData);

    const productOnDatabase = await prisma.product.findFirst({
      where: {
        name: productData.name,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(productOnDatabase).toBeTruthy();
  });

  test('[POST] /products throw CategoryNotFoundException', async () => {
    const productData = {
      name: 'Product Name',
      description: 'Product Description',
      price: 10.99,
      imageUrl: 'https://mysite.com/images/product001.png',
      categoryId: randomUUID(),
    };

    await request(app.getHttpServer()).post('/products').send(productData);

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData);

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category '${productData.categoryId}' not found.`,
    );
  });
});
