import { beforeEach, describe, expect, it } from 'vitest';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { FindAllOrdersUseCase } from './find-all-orders.usecase';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let findAllOrders: FindAllOrdersUseCase;

describe('Find All Orders', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    findAllOrders = new FindAllOrdersUseCase(inMemoryOrdersRepository);
  });

  it('should be able list all orders paginated without filters', async () => {
    await mockListOrders();

    const queryParams = {
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllOrders.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });

  it('should be able list all orders paginated with filters', async () => {
    await mockListOrders();
    await mockFinishedOrders();

    const queryParams = {
      isFinished: true,
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllOrders.execute(queryParams);

    expect(result.data.length).toEqual(1);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(1);
    expect(result.pagination.pageCount).toEqual(1);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(false);
  });
});

async function mockListOrders() {
  const newUser = {
    name: 'Webs System',
    username: 'Webs.System',
    avatarUrl: 'https://github.com/WebertonMendes.png',
    password: 'password123',
  };

  await inMemoryUsersRepository.create(newUser);
  const user = await inMemoryUsersRepository.findByUsername(newUser.username);

  await inMemoryOrdersRepository.create({
    table: 12,
    clientId: 1212,
    userId: user.id,
  });

  await inMemoryOrdersRepository.create({
    table: 22,
    clientId: 1213,
    userId: user.id,
  });

  await inMemoryOrdersRepository.create({
    table: 32,
    clientId: 1214,
    userId: user.id,
  });

  await inMemoryOrdersRepository.create({
    table: 42,
    clientId: 1215,
    userId: user.id,
  });

  await inMemoryOrdersRepository.create({
    table: 52,
    clientId: 1216,
    userId: user.id,
  });
}

async function mockFinishedOrders() {
  const order = inMemoryOrdersRepository.items[0];
  await inMemoryOrdersRepository.update(order.id, { isFinished: true });
}
