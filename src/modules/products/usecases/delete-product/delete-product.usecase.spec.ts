import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { DeleteProductUseCase } from './delete-product.usecase';
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-order-item.repository';
import { ProductCannotDeletedException } from '../../exceptions/product-cannot-deleted-exception';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-order.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';

let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryOrderItemsRepository: InMemoryOrderItemsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let deleteProduct: DeleteProductUseCase;

describe('Delete Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryOrderItemsRepository = new InMemoryOrderItemsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    deleteProduct = new DeleteProductUseCase(
      inMemoryProductsRepository,
      inMemoryOrderItemsRepository,
    );
  });

  it('should be able to delete product by id', async () => {
    await inMemoryProductsRepository.create({
      name: 'Mouse Gammer',
      description: 'Product description',
      price: 89.99,
      imageUrl: 'http://mydomain.com/products/1010.png',
      categoryId: 'categoryId',
    });

    const product = await inMemoryProductsRepository.findAll(
      { name: 'Mouse Gammer', categoryId: 'categoryId' },
      {},
    );

    const productId = product.data[0].id;

    await deleteProduct.execute(productId);

    const allProducts = inMemoryProductsRepository.items;

    expect(allProducts.length).toEqual(0);
  });

  it('should be able to throw a ProductNotFoundException if the product id not found.', async () => {
    const fakeProductId = 'fake-productId';

    try {
      await deleteProduct.execute(fakeProductId);
    } catch (error) {
      expect(() => {
        throw new ProductNotFoundException(fakeProductId);
      }).toThrow(ProductNotFoundException);
    }
  });

  it('should be able to throw a ProductCannotDeletedException if the product id not found.', async () => {
    await inMemoryUsersRepository.create({
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
    });

    const user = await inMemoryUsersRepository.findByUsername('Webs.System');

    await inMemoryProductsRepository.create({
      name: 'Drink Gammer',
      description: 'Product description',
      price: 89.99,
      imageUrl: 'http://mydomain.com/products/1010.png',
      categoryId: 'abc123',
    });

    const product = await inMemoryProductsRepository.findAll(
      { name: 'Drink Gammer', categoryId: 'abc123' },
      {},
    );

    const savedProduct = product.data[0];

    inMemoryOrdersRepository.create({
      table: 11,
      clientId: 1212,
      userId: user.id,
    });

    const order = await inMemoryOrdersRepository.checkExists({
      table: 11,
      clientId: 1212,
      isFinished: false,
    });

    inMemoryOrderItemsRepository.create({
      orderId: order.id,
      productId: savedProduct.id,
      quantity: 2,
      observation: 'this is my observation',
    });

    try {
      await deleteProduct.execute(savedProduct.id);
    } catch (error) {
      expect(() => {
        throw new ProductCannotDeletedException(savedProduct.id);
      }).toThrow(ProductCannotDeletedException);
    }
  });
});
