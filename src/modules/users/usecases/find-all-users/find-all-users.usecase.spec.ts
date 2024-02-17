import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { UserRole } from '@prisma/client';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { FindAllUsersUseCase } from './find-all-users.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let findAllUsers: FindAllUsersUseCase;

describe('Find All Users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    findAllUsers = new FindAllUsersUseCase(inMemoryUsersRepository);
  });

  it('should be able list all users paginated without filters', async () => {
    await mockListUsers();

    const queryParams = {
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllUsers.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(6);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });

  it('should be able list all users paginated with filters', async () => {
    await mockListUsers();

    const queryParams = {
      role: UserRole.ADMIN,
      isActive: false,
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllUsers.execute(queryParams);

    expect(result.data.length).toEqual(1);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(1);
    expect(result.pagination.pageCount).toEqual(1);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(false);
  });
});

async function mockListUsers() {
  await inMemoryUsersRepository.create({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.url(),
    role: UserRole.ADMIN,
    password: faker.internet.password(),
    isActive: true,
  });

  await inMemoryUsersRepository.create({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.url(),
    role: UserRole.KITCHEN,
    password: faker.internet.password(),
    isActive: true,
  });

  await inMemoryUsersRepository.create({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.url(),
    role: UserRole.KITCHEN,
    password: faker.internet.password(),
    isActive: true,
  });

  await inMemoryUsersRepository.create({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.url(),
    role: UserRole.SERVICE,
    password: faker.internet.password(),
    isActive: true,
  });

  await inMemoryUsersRepository.create({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.url(),
    role: UserRole.SERVICE,
    password: faker.internet.password(),
    isActive: false,
  });

  await inMemoryUsersRepository.create({
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.url(),
    role: UserRole.ADMIN,
    password: faker.internet.password(),
    isActive: false,
  });
}
