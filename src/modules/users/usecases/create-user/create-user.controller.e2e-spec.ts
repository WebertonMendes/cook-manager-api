import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create user (E2E)', () => {
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

  test('[POST] /users', async () => {
    const userData = {
      name: 'John Doe',
      username: 'john.doe23',
      avatarUrl: 'http://mydomain.com/avatar1234.jpg',
      password: 'password@123',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(userOnDatabase).toBeTruthy();
  });

  test('[POST] /users throw UserAlreadyExistsException', async () => {
    const userData = {
      name: 'John Doe',
      username: 'john.doe23',
      avatarUrl: 'http://mydomain.com/avatar1234.jpg',
      password: 'password@123',
    };

    await request(app.getHttpServer()).post('/users').send(userData);

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData);

    expect(response.statusCode).toBe(HttpStatus.CONFLICT);
    expect(response.body.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(response.body.message).toEqual(
      `User '${userData.username}' already exists.`,
    );
  });
});
