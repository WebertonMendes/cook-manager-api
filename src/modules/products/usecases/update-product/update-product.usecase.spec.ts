import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { UpdateProductUseCase } from './update-product.usecase';

let inMemoryProductsRepository: InMemoryProductsRepository;
let updateProduct: UpdateProductUseCase;

describe('Update Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    updateProduct = new UpdateProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to update product data by id', async () => {
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

    expect(savedProduct.isActive).toEqual(true);

    const productId = savedProduct.id;
    const data = { isActive: false };

    await updateProduct.execute(productId, data);

    expect(savedProduct.isActive).toEqual(data.isActive);
    expect(savedProduct.name).toEqual(newProduct.name);
  });

  it('should be able to throw a ProductNotFoundException if the product id not found.', async () => {
    const fakeProductId = randomUUID();
    const data = { isActive: false };

    try {
      await updateProduct.execute(fakeProductId, data);
    } catch (error) {
      expect(() => {
        throw new ProductNotFoundException(fakeProductId);
      }).toThrow(ProductNotFoundException);
    }
  });
});
