import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CategoryFactory } from 'test/factories/make-categories';

describe('Update category by ID (E2E)', () => {
  let app: INestApplication;
  let categoryFactory: CategoryFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CategoryFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    categoryFactory = moduleRef.get(CategoryFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PATCH] /categories/:id', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const response = await request(app.getHttpServer())
      .patch(`/categories/${category.id}`)
      .send({ isActive: false });

    const categoryOnDatabase = await prisma.category.findUnique({
      where: {
        name: category.name,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(categoryOnDatabase.name).toEqual(category.name);
    expect(categoryOnDatabase.isActive).toEqual(false);
  });

  test('[PATCH] /categories/:id throw not found', async () => {
    const categoryId = 'fakeCategoryId';

    const response = await request(app.getHttpServer())
      .patch(`/categories/${categoryId}`)
      .send({ isActive: false });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category '${categoryId}' not found.`,
    );
  });
});
