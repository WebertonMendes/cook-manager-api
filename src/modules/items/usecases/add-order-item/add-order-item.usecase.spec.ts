import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { OrderIsFinishedException } from '@/modules/orders/exceptions/order-is-finished-exception';
import { OrderNotFoundException } from '@/modules/orders/exceptions/order-not-found-exception';
import { RefreshOrderPriceUseCase } from '@/modules/orders/usecases/refresh-order-price/refresh-order-price.usecase';
import { ProductInactiveException } from '@/modules/products/exceptions/product-inactive-exception';
import { ProductNotFoundException } from '@/modules/products/exceptions/product-not-found-exception';
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-order-item.repository';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { AddOrderItemUseCase } from './add-order-item.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryOrderItemsRepository: InMemoryOrderItemsRepository;

let refreshOrderPrice: RefreshOrderPriceUseCase;
let addOrderItem: AddOrderItemUseCase;

describe('Add Order Item', () => {
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

    addOrderItem = new AddOrderItemUseCase(
      inMemoryOrderItemsRepository,
      inMemoryOrdersRepository,
      inMemoryProductsRepository,
      refreshOrderPrice,
    );
  });

  it('should be able to add an item in an order', async () => {
    const { user, product, order } = await mockOrder();

    await addOrderItem.execute({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    });

    const savedOrderItem = inMemoryOrderItemsRepository.items[0];

    expect(savedOrderItem).toHaveProperty('id');
    expect(savedOrderItem).toHaveProperty('createdAt');
    expect(savedOrderItem).toHaveProperty('updatedAt');
    expect(savedOrderItem.status).toEqual('PENDING');
    expect(savedOrderItem.orderId).toEqual(order.id);
    expect(savedOrderItem.productId).toEqual(product.id);
    expect(savedOrderItem.quantity).toEqual(1);
    expect(savedOrderItem.userId).toEqual(user.id);
  });

  it('should be able to calculate and update the order total price when added an item', async () => {
    const { user, product, order } = await mockOrder();

    const productPrice = Number(product.price);

    await addOrderItem.execute({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    });

    expect(order.totalPrice).toEqual(productPrice);

    await addOrderItem.execute({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    });

    expect(order.totalPrice).toEqual(productPrice * 2);
  });

  it('should be able to throw a ProductNotFoundException if product received not exists', async () => {
    const { user, order } = await mockOrder();

    const productId = randomUUID();

    const newOrderItem = {
      orderId: order.id,
      productId,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    };

    try {
      await addOrderItem.execute(newOrderItem);
    } catch (error) {
      expect(() => {
        throw new ProductNotFoundException(`${productId}`);
      }).toThrow(ProductNotFoundException);
    }
  });

  it('should be able to throw a ProductInactiveException if product received is inactive', async () => {
    const { user, product, order } = await mockOrder();

    await inMemoryProductsRepository.update(product.id, { isActive: false });

    const newOrderItem = {
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    };

    try {
      await addOrderItem.execute(newOrderItem);
    } catch (error) {
      expect(() => {
        throw new ProductInactiveException(`${product.id}`);
      }).toThrow(ProductInactiveException);
    }
  });

  it('should be able to throw a OrderNotFoundException if order received not exists', async () => {
    const { user, product } = await mockOrder();

    const orderId = randomUUID();

    const newOrderItem = {
      orderId,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    };

    try {
      await addOrderItem.execute(newOrderItem);
    } catch (error) {
      expect(() => {
        throw new OrderNotFoundException(`${orderId}`);
      }).toThrow(OrderNotFoundException);
    }
  });

  it('should be able to throw a OrderIsFinishedException if order received is inactive', async () => {
    const { user, product, order } = await mockOrder();

    await inMemoryOrdersRepository.update(order.id, { isFinished: true });

    const newOrderItem = {
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    };

    try {
      await addOrderItem.execute(newOrderItem);
    } catch (error) {
      expect(() => {
        throw new OrderIsFinishedException(`${order.id}`);
      }).toThrow(OrderIsFinishedException);
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
