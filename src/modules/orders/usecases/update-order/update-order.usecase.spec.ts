import { beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';

import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { OrderNotFoundException } from '../../exceptions/order-not-found-exception';
import { UpdateOrderUseCase } from './update-order.usecase';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let updateOrder: UpdateOrderUseCase;

describe('Update Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    updateOrder = new UpdateOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able to update order data by id', async () => {
    await inMemoryOrdersRepository.create({
      table: 22,
      clientId: 132,
      userId: randomUUID(),
    });

    const savedOrder = await inMemoryOrdersRepository.checkExists({
      table: 22,
      clientId: 132,
      isFinished: false,
    });

    await updateOrder.execute(savedOrder.id, { isFinished: true });
    const updatedOrder = await inMemoryOrdersRepository.findById(savedOrder.id);

    expect(updatedOrder.isFinished).toEqual(true);
    expect(updatedOrder.id).toEqual(savedOrder.id);
    expect(updatedOrder.table).toEqual(savedOrder.table);
    expect(updatedOrder.clientId).toEqual(savedOrder.clientId);
  });

  it('should be able to throw a OrderNotFoundException if the order id not found.', async () => {
    const fakeOrderId = randomUUID();
    const data = { isFinished: true };

    try {
      await updateOrder.execute(fakeOrderId, data);
    } catch (error) {
      expect(() => {
        throw new OrderNotFoundException(fakeOrderId);
      }).toThrow(OrderNotFoundException);
    }
  });
});
