import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { UserFactory } from 'test/factories/make-users';

describe('Find user by ID (E2E)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[GET] /users/:id', async () => {
    const user = await userFactory.makePrismaUser();

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(user.id);
  });

  test('[GET] /users/:id throw not found', async () => {
    const userId = 'fakeUserId';

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`User '${userId}' not found.`);
  });
});
