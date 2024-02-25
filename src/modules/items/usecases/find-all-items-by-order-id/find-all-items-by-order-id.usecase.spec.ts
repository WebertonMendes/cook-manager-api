import { $Enums } from '@prisma/client';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { OrderNotFoundException } from '@/modules/orders/exceptions/order-not-found-exception';
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-order-item.repository';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { FindAllItemsByOrderIdUseCase } from './find-all-items-by-order-id.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryOrderItemsRepository: InMemoryOrderItemsRepository;

let findAllItemsByOrderId: FindAllItemsByOrderIdUseCase;

describe('Find All Order Items by order id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryOrderItemsRepository = new InMemoryOrderItemsRepository();

    findAllItemsByOrderId = new FindAllItemsByOrderIdUseCase(
      inMemoryOrderItemsRepository,
      inMemoryOrdersRepository,
      inMemoryProductsRepository,
    );
  });

  it('should be able list all order items by order id', async () => {
    const { user, product, order } = await mockOrder();

    await inMemoryOrderItemsRepository.create({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    });

    const result = await findAllItemsByOrderId.execute(order.id);

    expect(result.id).toEqual(order.id);
    expect(result.userId).toEqual(user.id);
    expect(result.isFinished).toEqual(false);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('items');
    expect(result.items).length(1);
    expect(result.items[0].productId).toEqual(product.id);
    expect(result.items[0].quantity).toEqual(1);
    expect(result.items[0].status).toEqual($Enums.OrderItemStatus.PENDING);
    expect(result.items[0]).toHaveProperty('productName');
    expect(result.items[0]).toHaveProperty('price');
    expect(result.items[0]).toHaveProperty('totalPrice');
    expect(result.items[0]).toHaveProperty('createdAt');
    expect(result.items[0]).toHaveProperty('updatedAt');
  });

  it('should be able to throw a OrderNotFoundException if order received not exists', async () => {
    const orderId = randomUUID();

    try {
      await findAllItemsByOrderId.execute(orderId);
    } catch (error) {
      expect(() => {
        throw new OrderNotFoundException(`${orderId}`);
      }).toThrow(OrderNotFoundException);
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
