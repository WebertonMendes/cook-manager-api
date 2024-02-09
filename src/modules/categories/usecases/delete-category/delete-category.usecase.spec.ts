import { beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';

import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { CategoryNotFoundException } from '../../exceptions/category-not-found-exception';
import { DeleteCategoryUseCase } from './delete-category.usecase';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let deleteCategory: DeleteCategoryUseCase;

describe('Delete Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    deleteCategory = new DeleteCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to delete category by id', async () => {
    const categoryName = 'Drinks';

    await inMemoryCategoriesRepository.create({ name: categoryName });

    const savedCategory =
      await inMemoryCategoriesRepository.findByName(categoryName);

    await deleteCategory.execute(savedCategory.id);

    const allCategories = inMemoryCategoriesRepository.items;

    expect(allCategories.length).toEqual(0);
  });

  it('should be able to throw a CategoryNotFoundException if the category id not found.', async () => {
    const categoryId = randomUUID();

    try {
      await deleteCategory.execute(categoryId);
    } catch (error) {
      expect(() => {
        throw new CategoryNotFoundException(categoryId);
      }).toThrow(CategoryNotFoundException);
    }
  });
});
