import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { CategoryFactory } from 'test/factories/make-categories';

describe('Find category by ID (E2E)', () => {
  let app: INestApplication;
  let categoryFactory: CategoryFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CategoryFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    categoryFactory = moduleRef.get(CategoryFactory);

    await app.init();
  });

  test('[GET] /categories/:id', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const response = await request(app.getHttpServer())
      .get(`/categories/${category.id}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(category.id);
  });

  test('[GET] /categories/:id throw not found', async () => {
    const categoryId = 'fakeCategoryId';

    const response = await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category '${categoryId}' not found.`,
    );
  });
});
