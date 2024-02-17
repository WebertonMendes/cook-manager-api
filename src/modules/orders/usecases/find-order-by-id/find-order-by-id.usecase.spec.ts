import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { OrderNotFoundException } from '../../exceptions/order-not-found-exception';
import { FindOrderByIdUseCase } from './find-order-by-id.usecase';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let findOrderById: FindOrderByIdUseCase;

describe('Find Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    findOrderById = new FindOrderByIdUseCase(inMemoryOrdersRepository);
  });

  it('should be able to find order by id', async () => {
    await inMemoryOrdersRepository.create({
      table: 15,
      clientId: 1209,
      userId: randomUUID(),
    });

    const savedOrder = await inMemoryOrdersRepository.checkExists({
      table: 15,
      clientId: 1209,
      isFinished: false,
    });

    const order = await findOrderById.execute(savedOrder.id);

    expect(savedOrder.id).toEqual(order.id);
    expect(savedOrder.clientId).toEqual(order.clientId);
    expect(savedOrder.table).toEqual(order.table);
  });

  it('should be able to throw a OrderNotFoundException if the order id not found.', async () => {
    const fakeOrderId = randomUUID();

    try {
      await findOrderById.execute(fakeOrderId);
    } catch (error) {
      expect(() => {
        throw new OrderNotFoundException(fakeOrderId);
      }).toThrow(OrderNotFoundException);
    }
  });
});
