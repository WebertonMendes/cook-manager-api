import { beforeEach, describe, expect, it } from 'vitest';

import { AddOrderItemUseCase } from '@/modules/items/usecases/add-order-item/add-order-item.usecase';
import { RefreshOrderPriceUseCase } from '@/modules/orders/usecases/refresh-order-price/refresh-order-price.usecase';
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-order-item.repository';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { UpdateOrderItemUseCase } from '@/modules/items/usecases/update-order-item/update-order-item.usecase';
import { DeleteOrderItemUseCase } from '@/modules/items/usecases/delete-order-item/delete-order-item.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryOrderItemsRepository: InMemoryOrderItemsRepository;

let refreshOrderPrice: RefreshOrderPriceUseCase;
let addOrderItem: AddOrderItemUseCase;
let updateOrderItem: UpdateOrderItemUseCase;
let deleteOrderItem: DeleteOrderItemUseCase;

describe('Refresh Order Price', () => {
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

    updateOrderItem = new UpdateOrderItemUseCase(
      inMemoryOrderItemsRepository,
      refreshOrderPrice,
    );

    deleteOrderItem = new DeleteOrderItemUseCase(
      inMemoryOrderItemsRepository,
      refreshOrderPrice,
    );
  });

  it('should be able to update order price case any item added, updated or deleted', async () => {
    const { user, product, order } = await mockOrder();

    const orderPrice = Number(order.totalPrice);
    const productPrice = Number(product.price);

    expect(orderPrice).toEqual(0);

    await addOrderItem.execute({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      observation: 'this is my observation',
      userId: user.id,
    });

    const orderPriceUpdatedWhenAddItem = Number(order.totalPrice);
    expect(orderPriceUpdatedWhenAddItem).toEqual(productPrice);

    const savedOrderItem = inMemoryOrderItemsRepository.items[0];

    await updateOrderItem.execute(savedOrderItem.id, { quantity: 2 });

    const orderPriceUpdatedWhenUpdateItem = Number(order.totalPrice);
    expect(orderPriceUpdatedWhenUpdateItem).toEqual(productPrice * 2);

    await deleteOrderItem.execute(savedOrderItem.id);

    const orderPriceUpdatedWhenDeleteItem = Number(order.totalPrice);
    expect(orderPriceUpdatedWhenDeleteItem).toEqual(0);
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
