import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { UserFactory } from 'test/factories/make-users';

describe('Delete user by ID (E2E)', () => {
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

  test('[DELETE] /users/:id', async () => {
    const user = await userFactory.makePrismaUser();

    const response = await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .send();

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(userOnDatabase).toBeNull();
  });

  test('[DELETE] /users/:id throw not found', async () => {
    const userId = 'fakeUserId';

    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`User '${userId}' not found.`);
  });
});
