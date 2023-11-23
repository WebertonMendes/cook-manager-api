import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { UserFactory } from 'test/factories/make-users';

describe('Update user by ID (E2E)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get(UserFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PATCH] /users/:id', async () => {
    const user = await userFactory.makePrismaUser();

    const response = await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send({ isActive: false });

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(userOnDatabase.username).toEqual(user.username);
    expect(userOnDatabase.isActive).toEqual(false);
  });

  test('[PATCH] /users/:id thrown not found', async () => {
    const userId = 'fakeUserId';

    const response = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send({ isActive: false });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`User '${userId}' not found.`);
  });
});
