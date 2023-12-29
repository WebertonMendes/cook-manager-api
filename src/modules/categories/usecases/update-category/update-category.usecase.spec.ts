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
    const newCategory = {
      name: 'Drinks',
    };

    await inMemoryCategoriesRepository.create(newCategory);

    const savedCategory = await inMemoryCategoriesRepository.findByName(
      newCategory.name,
    );

    expect(savedCategory.isActive).toEqual(true);

    const categoryId = savedCategory.id;
    const data = { isActive: false };

    await updateCategory.execute(categoryId, data);

    expect(savedCategory.isActive).toEqual(data.isActive);
    expect(savedCategory.name).toEqual(newCategory.name);
  });

  it('should be able to throw a CategoryNotFoundException if the category id not found.', async () => {
    const fakeCategoryId = 'fake-categoryId';
    const data = { isActive: false };

    try {
      await updateCategory.execute(fakeCategoryId, data);
    } catch (error) {
      expect(() => {
        throw new CategoryNotFoundException(fakeCategoryId);
      }).toThrow(CategoryNotFoundException);
    }
  });
});
