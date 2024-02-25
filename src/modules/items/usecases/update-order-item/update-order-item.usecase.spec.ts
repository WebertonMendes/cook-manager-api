import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { RefreshOrderPriceUseCase } from '@/modules/orders/usecases/refresh-order-price/refresh-order-price.usecase';
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-order-item.repository';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { OrderItemNotFoundException } from '../../exceptions/order-item-not-found-exception';
import { UpdateOrderItemUseCase } from './update-order-item.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryOrderItemsRepository: InMemoryOrderItemsRepository;

let refreshOrderPrice: RefreshOrderPriceUseCase;
let updateOrderItem: UpdateOrderItemUseCase;

describe('Update Ordem Item', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryOrderItemsRepository = new InMemoryOrderItemsRepository();

    refreshOrderPrice = new RefreshOrderPriceUseCase(
      inMemoryOrdersRepository,
      inMemoryOrderItemsRepository,
      inMemoryProductsRepository,
    );

    updateOrderItem = new UpdateOrderItemUseCase(
      inMemoryOrderItemsRepository,
      refreshOrderPrice,
    );
  });

  it('should be able to update order item data by id', async () => {
    const { user, product, order } = await mockOrder();

    await inMemoryOrderItemsRepository.create({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    });

    const savedOrderItem = inMemoryOrderItemsRepository.items[0];

    expect(savedOrderItem.quantity).toEqual(1);

    await updateOrderItem.execute(savedOrderItem.id, { quantity: 2 });

    expect(savedOrderItem.orderId).toEqual(order.id);
    expect(savedOrderItem.quantity).toEqual(2);
  });

  it('should be able to throw a OrderItemNotFoundException if the order item id not found', async () => {
    const fakeOrderItemId = randomUUID();

    try {
      await updateOrderItem.execute(fakeOrderItemId, { quantity: 2 });
    } catch (error) {
      expect(() => {
        throw new OrderItemNotFoundException(fakeOrderItemId);
      }).toThrow(OrderItemNotFoundException);
    }
  });
});

async function mockOrder() {
  await inMemoryUsersRepository.create({
    name: 'Webs System',
    username: 'Webs.System',
    avatarUrl: 'https://github.com/WebertonMendes.png',
    password: 'password123',
  });

  const savedUser = inMemoryUsersRepository.items[0];

  await inMemoryCategoriesRepository.create({
    name: 'Drinks',
  });

  const savedCategory = inMemoryCategoriesRepository.items[0];

  await inMemoryProductsRepository.create({
    name: 'Product Name',
    description: 'Product Description',
    price: 10.99,
    imageUrl: 'https://mysite.com/images/product001.png',
    categoryId: savedCategory.id,
  });

  const savedProduct = inMemoryProductsRepository.items[0];

  await inMemoryOrdersRepository.create({
    table: 22,
    clientId: 132,
    userId: savedUser.id,
  });

  const savedOrder = inMemoryOrdersRepository.items[0];

  return {
    user: savedUser,
    product: savedProduct,
    order: savedOrder,
  };
}
