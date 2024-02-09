import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CategoryFactory } from 'test/factories/make-categories';

describe('Delete category (E2E)', () => {
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

  test('[DELETE] /categories/:id', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const response = await request(app.getHttpServer())
      .delete(`/categories/${category.id}`)
      .send();

    const categoryOnDatabase = await prisma.category.findUnique({
      where: {
        name: category.name,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(categoryOnDatabase).toBeNull();
  });

  test('[DELETE] /categories/:id throw CategoryNotFoundException', async () => {
    const categoryId = randomUUID();

    const response = await request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category '${categoryId}' not found.`,
    );
  });
});
