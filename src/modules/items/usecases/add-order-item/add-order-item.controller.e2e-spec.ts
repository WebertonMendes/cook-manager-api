import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Add Order Item (E2E)', () => {
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

  test('[POST] /orders/items', async () => {
    await request(app.getHttpServer()).post('/users').send({
      name: 'John Doe',
      username: 'john.doe23',
      password: 'password@123',
    });

    const user = await prisma.user.findUnique({
      where: {
        username: 'john.doe23',
      },
    });

    await request(app.getHttpServer()).post('/orders').send({
      table: 28,
      clientId: 1218,
      userId: user.id,
    });

    const order = await prisma.order.findFirst({
      where: {
        table: 28,
        clientId: 1218,
        isFinished: false,
      },
    });

    await request(app.getHttpServer()).post('/categories').send({
      name: 'Drinks',
    });

    const category = await prisma.category.findUnique({
      where: {
        name: 'Drinks',
      },
    });

    await request(app.getHttpServer()).post('/products').send({
      name: 'Product Name',
      description: 'Product Description',
      price: 10.99,
      imageUrl: 'https://mysite.com/images/product001.png',
      categoryId: category.id,
    });

    const product = await prisma.product.findFirst({
      where: {
        name: 'Product Name',
      },
    });

    const response = await request(app.getHttpServer())
      .post('/orders/items')
      .send({
        orderId: order.id,
        productId: product.id,
        quantity: 1,
        observation: 'this is my observation',
        userId: order.userId,
      });

    const orderItemOnDatabase = await prisma.orderItems.findFirst({
      where: {
        orderId: order.id,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(orderItemOnDatabase).toBeTruthy();
  });
});
