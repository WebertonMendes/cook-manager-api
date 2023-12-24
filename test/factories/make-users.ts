import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserEntity> = {}): Promise<UserEntity> {
    const user = makeUser(data);

    await this.prisma.user.create({
      data: user,
    });

    return user;
  }
}

function makeUser(override: Partial<UserEntity> = {}) {
  return new UserEntity({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...override,
  });
}
