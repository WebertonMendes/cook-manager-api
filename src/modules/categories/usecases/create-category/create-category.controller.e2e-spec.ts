import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create category (E2E)', () => {
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

  test('[POST] /categories', async () => {
    const categoryData = {
      name: 'Drinks',
    };

    const response = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData);

    const categoryOnDatabase = await prisma.category.findUnique({
      where: {
        name: categoryData.name,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(categoryOnDatabase).toBeTruthy();
  });

  test('[POST] /categories throw CategoryAlreadyExistsException', async () => {
    const categoryData = {
      name: 'Salads',
    };

    await request(app.getHttpServer()).post('/categories').send(categoryData);

    const response = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData);

    expect(response.statusCode).toBe(HttpStatus.CONFLICT);
    expect(response.body.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(response.body.message).toEqual(
      `Category '${categoryData.name}' already exists.`,
    );
  });
});
