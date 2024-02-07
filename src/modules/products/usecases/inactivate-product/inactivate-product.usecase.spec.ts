import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { InactivateProductUseCase } from './inactivate-product.usecase';

let inMemoryProductsRepository: InMemoryProductsRepository;
let inactivateProduct: InactivateProductUseCase;

describe('Inactive product by ID', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inactivateProduct = new InactivateProductUseCase(
      inMemoryProductsRepository,
    );
  });

  it('should be able to inactivate product by id', async () => {
    const newProduct = {
      name: 'Mouse Gammer',
      description: 'Product description',
      price: 89.99,
      imageUrl: 'http://mydomain.com/products/1010.png',
      categoryId: 'categoryId',
    };

    await inMemoryProductsRepository.create(newProduct);

    const savedProduct = inMemoryProductsRepository.items.filter(
      (product) => product.name === newProduct.name,
    )[0];

    await inactivateProduct.execute(savedProduct.id);

    const allProducts = inMemoryProductsRepository.items;
    const inactiveProduct = allProducts[0];
    const inactiveProductsCategoryId = '50228d88-a780-4982-b844-c95c405cc290';

    expect(allProducts.length).toEqual(1);
    expect(inactiveProduct.categoryId).toEqual(inactiveProductsCategoryId);
    expect(inactiveProduct.imageUrl).toBeNull();
    expect(inactiveProduct.isActive).toEqual(false);
  });

  it('should be able to throw a ProductNotFoundException if the product id not found.', async () => {
    const fakeProductId = 'fake-productId';

    try {
      await inactivateProduct.execute(fakeProductId);
    } catch (error) {
      expect(() => {
        throw new ProductNotFoundException(fakeProductId);
      }).toThrow(ProductNotFoundException);
    }
  });
});
