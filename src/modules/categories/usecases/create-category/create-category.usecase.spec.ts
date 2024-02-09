import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { CategoryAlreadyExistsException } from '../../exceptions/category-already-exists-exception';
import { CreateCategoryUseCase } from './create-category.usecase';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

let createCategory: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategory = new CreateCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const categoryName = 'Drinks';

    await createCategory.execute({ name: categoryName });

    const savedCategory = inMemoryCategoriesRepository.items[0];

    expect(savedCategory.name).toEqual(categoryName);
    expect(savedCategory).toHaveProperty('id');
  });

  it('should be able to throw a CategoryAlreadyExistsException if the category name already exists.', async () => {
    const categoryName = 'Salads';

    try {
      await createCategory.execute({ name: categoryName });
      await createCategory.execute({ name: categoryName });
    } catch (error) {
      expect(() => {
        throw new CategoryAlreadyExistsException(categoryName);
      }).toThrow(CategoryAlreadyExistsException);
    }
  });
});
