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
    const category = {
      name: 'Drinks',
    };

    await createCategory.execute(category);

    const savedCategory = inMemoryCategoriesRepository.items[0];

    expect(savedCategory.name).toEqual(category.name);
    expect(savedCategory).toHaveProperty('id');
  });

  it('should be able to throw a CategoryAlreadyExistsException if the category name already exists.', async () => {
    const category = {
      name: 'Salads',
    };

    try {
      await createCategory.execute(category);
      await createCategory.execute(category);
    } catch (error) {
      expect(() => {
        throw new CategoryAlreadyExistsException(category.name);
      }).toThrow(CategoryAlreadyExistsException);
    }
  });
});
