import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { FindCategoryByIdUseCase } from './find-category-by-id.usecase';
import { CategoryNotFoundException } from '../../exceptions/category-not-found-exception';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let findCategoryById: FindCategoryByIdUseCase;

describe('Find category by ID', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    findCategoryById = new FindCategoryByIdUseCase(
      inMemoryCategoriesRepository,
    );
  });

  it('should be able to find category by id', async () => {
    const newCategory = {
      name: 'Drinks',
    };

    await inMemoryCategoriesRepository.createCategory(newCategory);

    const savedCategory = await inMemoryCategoriesRepository.findByName(
      newCategory.name,
    );

    const category = await findCategoryById.execute(savedCategory.id);

    expect(savedCategory.id).toEqual(category.id);
    expect(savedCategory.name).toEqual(category.name);
    expect(savedCategory.name).toEqual(category.name);
  });

  it('should be able to throw a CategoryNotFoundException if the category id not found.', async () => {
    const fakeCategoryId = 'fake-categoryId';

    try {
      await findCategoryById.execute(fakeCategoryId);
    } catch (error) {
      expect(() => {
        throw new CategoryNotFoundException(fakeCategoryId);
      }).toThrow(CategoryNotFoundException);
    }
  });
});
