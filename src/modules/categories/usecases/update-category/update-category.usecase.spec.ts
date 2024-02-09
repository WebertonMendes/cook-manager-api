import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { CategoryNotFoundException } from '../../exceptions/category-not-found-exception';
import { UpdateCategoryUseCase } from './update-category.usecase';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let updateCategory: UpdateCategoryUseCase;

describe('Update Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    updateCategory = new UpdateCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to update category data by id', async () => {
    const categoryName = 'Drinks';

    await inMemoryCategoriesRepository.create({ name: categoryName });

    const savedCategory =
      await inMemoryCategoriesRepository.findByName(categoryName);

    expect(savedCategory.isActive).toEqual(true);

    const categoryId = savedCategory.id;
    const data = { isActive: false };

    await updateCategory.execute(categoryId, data);

    expect(savedCategory.isActive).toEqual(data.isActive);
    expect(savedCategory.name).toEqual(categoryName);
  });

  it('should be able to throw a CategoryNotFoundException if the category id not found.', async () => {
    const categoryId = randomUUID();

    try {
      await updateCategory.execute(categoryId, { isActive: false });
    } catch (error) {
      expect(() => {
        throw new CategoryNotFoundException(categoryId);
      }).toThrow(CategoryNotFoundException);
    }
  });
});
