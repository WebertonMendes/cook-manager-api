import { beforeEach, describe, expect, it } from 'vitest';

import { UserNotFoundException } from '@/modules/users/exceptions/user-not-found-exception';
import { Prisma } from '@prisma/client';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { DuplicateOrderException } from '../../exceptions/duplicate-order-exception';
import { CreateOrderUseCase } from './create-order.usecase';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createOrder: CreateOrderUseCase;

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createOrder = new CreateOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to create a new order', async () => {
    const newUser = {
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
    };

    await inMemoryUsersRepository.create(newUser);

    const user = await inMemoryUsersRepository.findByUsername(newUser.username);

    const order = {
      table: 22,
      clientId: 132,
      userId: user.id,
    };

    await createOrder.execute(order);

    const savedOrder = inMemoryOrdersRepository.items[0];

    expect(savedOrder.table).toEqual(order.table);
    expect(savedOrder.clientId).toEqual(order.clientId);
    expect(savedOrder.isFinished).toEqual(false);
    expect(savedOrder.totalPrice).toEqual(new Prisma.Decimal(0.0));
    expect(savedOrder).toHaveProperty('id');
    expect(savedOrder).toHaveProperty('createdAt');
  });

  it('should be able to throw a DuplicateOrderException if exists opened order for clientId and table.', async () => {
    const order = {
      table: 22,
      clientId: 132,
      userId: '',
    };

    try {
      await createOrder.execute(order);
    } catch (error) {
      expect(() => {
        throw new DuplicateOrderException('OrderID-123');
      }).toThrow(DuplicateOrderException);
    }
  });

  it('should be able to throw a UserNotFoundException if userId in this order not exists.', async () => {
    const order = {
      table: 18,
      clientId: 120,
      userId: 'fake-user-id',
    };

    try {
      await createOrder.execute(order);
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(order.userId);
      }).toThrow(UserNotFoundException);
    }
  });
});
