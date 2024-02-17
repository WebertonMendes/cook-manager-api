import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { FindProductByIdUseCase } from './find-product-by-id.usecase';

let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

let findProductById: FindProductByIdUseCase;

describe('Find product by ID', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    findProductById = new FindProductByIdUseCase(inMemoryProductsRepository);
  });

  it('should be able to find product by id', async () => {
    await inMemoryCategoriesRepository.create({
      name: 'Drinks',
    });

    const savedCategory =
      await inMemoryCategoriesRepository.findByName('Drinks');

    const newProduct = {
      name: 'Product Name',
      description: 'Product Description',
      price: 10.99,
      imageUrl: 'https://mysite.com/images/product001.png',
      categoryId: savedCategory.id,
    };

    await inMemoryProductsRepository.create(newProduct);

    const savedProduct = inMemoryProductsRepository.items[0];

    const product = await findProductById.execute(savedProduct.id);

    expect(savedProduct.id).toEqual(product.id);
    expect(savedProduct.name).toEqual(product.name);
    expect(savedProduct.name).toEqual(product.name);
  });

  it('should be able to throw a ProductNotFoundException if the product id not found.', async () => {
    const fakeProductId = randomUUID();

    try {
      await findProductById.execute(fakeProductId);
    } catch (error) {
      expect(() => {
        throw new ProductNotFoundException(fakeProductId);
      }).toThrow(ProductNotFoundException);
    }
  });
});
