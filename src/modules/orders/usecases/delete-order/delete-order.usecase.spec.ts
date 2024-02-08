import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { OrderInProgressException } from '../../exceptions/order-in-progress-exception';
import { OrderIsFinishedException } from '../../exceptions/order-is-finished-exception';
import { OrderNotFoundException } from '../../exceptions/order-not-found-exception';
import { DeleteOrderUseCase } from './delete-order.usecase';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let deleteOrder: DeleteOrderUseCase;

describe('Delete Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    deleteOrder = new DeleteOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able to delete a order by id case this not finished and not exist included products', async () => {
    await inMemoryOrdersRepository.create({
      table: 8,
      clientId: 4579,
      userId: randomUUID(),
    });

    const savedOrder = await inMemoryOrdersRepository.checkExists({
      table: 8,
      clientId: 4579,
      isFinished: false,
    });

    await deleteOrder.execute(savedOrder.id);

    const allOrders = inMemoryOrdersRepository.items;

    expect(allOrders.length).toEqual(0);
  });

  it('should be able to throw a OrderNotFoundException if the order id not found.', async () => {
    const fakeOrderId = 'fake-orderId';

    try {
      await deleteOrder.execute(fakeOrderId);
    } catch (error) {
      expect(() => {
        throw new OrderNotFoundException(fakeOrderId);
      }).toThrow(OrderNotFoundException);
    }
  });

  it('should be able to throw a OrderInProgressException case this order not finished and exist included products.', async () => {
    await inMemoryOrdersRepository.create({
      table: 8,
      clientId: 4579,
      userId: randomUUID(),
    });

    const savedOrder = await inMemoryOrdersRepository.checkExists({
      table: 8,
      clientId: 4579,
      isFinished: false,
    });

    await inMemoryOrdersRepository.update(savedOrder.id, { totalPrice: 59.99 });

    try {
      await deleteOrder.execute(savedOrder.id);
    } catch (error) {
      expect(() => {
        throw new OrderInProgressException(savedOrder.id);
      }).toThrow(OrderInProgressException);
    }
  });

  it('should be able to throw a OrderIsFinishedException case this order is finished.', async () => {
    await inMemoryOrdersRepository.create({
      table: 8,
      clientId: 4579,
      userId: randomUUID(),
    });

    const savedOrder = await inMemoryOrdersRepository.checkExists({
      table: 8,
      clientId: 4579,
      isFinished: false,
    });

    await inMemoryOrdersRepository.update(savedOrder.id, { isFinished: true });

    try {
      await deleteOrder.execute(savedOrder.id);
    } catch (error) {
      expect(() => {
        throw new OrderIsFinishedException(savedOrder.id);
      }).toThrow(OrderIsFinishedException);
    }
  });
});
