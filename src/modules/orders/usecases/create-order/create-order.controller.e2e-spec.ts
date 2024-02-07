import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create order (E2E)', () => {
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

  test('[POST] /orders', async () => {
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

    const orderData = {
      table: 28,
      clientId: 1218,
      userId: user.id,
    };

    const response = await request(app.getHttpServer())
      .post('/orders')
      .send(orderData);

    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        table: 28,
        clientId: 1218,
        isFinished: false,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(orderOnDatabase).toBeTruthy();
  });

  test('[POST] /orders throw DuplicateOrderException', async () => {
    const order = {
      table: 28,
      clientId: 1218,
      userId: randomUUID(),
    };

    const response = await request(app.getHttpServer())
      .post('/orders')
      .send(order);

    const orderExists = await prisma.order.findFirst({
      where: {
        table: 28,
        clientId: 1218,
        isFinished: false,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toEqual(
      `It is not possible to create a duplicate order, the order '${orderExists.id}' is open.`,
    );
  });

  test('[POST] /orders throw UserNotFoundException', async () => {
    const order = {
      table: 12,
      clientId: 1012,
      userId: randomUUID(),
    };

    const response = await request(app.getHttpServer())
      .post('/orders')
      .send(order);

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`User '${order.userId}' not found.`);
  });
});
