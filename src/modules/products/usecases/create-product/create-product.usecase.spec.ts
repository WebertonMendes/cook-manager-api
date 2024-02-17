import { beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';

import { CategoryNotFoundException } from '@/modules/categories/exceptions/category-not-found-exception';
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { CreateProductUseCase } from './create-product.usecase';

let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

let createProduct: CreateProductUseCase;

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();

    createProduct = new CreateProductUseCase(
      inMemoryProductsRepository,
      inMemoryCategoriesRepository,
    );
  });

  it('should be able to create a new product', async () => {
    await inMemoryCategoriesRepository.create({
      name: 'Drinks',
    });

    const savedCategory =
      await inMemoryCategoriesRepository.findByName('Drinks');

    const product = {
      name: 'Product Name',
      description: 'Product Description',
      price: 10.99,
      imageUrl: 'https://mysite.com/images/product001.png',
      categoryId: savedCategory.id,
    };

    await createProduct.execute(product);

    const savedProduct = inMemoryProductsRepository.items[0];

    expect(savedProduct.name).toEqual(product.name);
    expect(savedProduct).toHaveProperty('id');
  });

  it('should be able to throw a CategoryNotFoundException if the category id not exists.', async () => {
    const product = {
      name: 'Product Name',
      description: 'Product Description',
      price: 10.99,
      imageUrl: 'https://mysite.com/images/product001.png',
      categoryId: randomUUID(),
    };

    try {
      await createProduct.execute(product);
    } catch (error) {
      expect(() => {
        throw new CategoryNotFoundException(product.categoryId);
      }).toThrow(CategoryNotFoundException);
    }
  });
});
