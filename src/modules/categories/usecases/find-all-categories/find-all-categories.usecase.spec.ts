import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-category.repository';
import { FindAllCategoriesUseCase } from './find-all-categories.usecase';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let findAllCategories: FindAllCategoriesUseCase;

describe('Find All Categories', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    findAllCategories = new FindAllCategoriesUseCase(
      inMemoryCategoriesRepository,
    );
  });

  it('should be able list all categories paginated without filters', async () => {
    await mockListCategories();

    const queryParams = {
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllCategories.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });

  it('should be able list all categories paginated with filters', async () => {
    await mockListCategories();

    const queryParams = {
      isActive: false,
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllCategories.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });
});

async function mockListCategories() {
  const category1 = {
    name: 'Category 1',
  };

  await inMemoryCategoriesRepository.createCategory(category1);

  const category2 = {
    name: 'Category 2',
  };

  await inMemoryCategoriesRepository.createCategory(category2);

  const category3 = {
    name: 'Category 3',
  };

  await inMemoryCategoriesRepository.createCategory(category3);

  const category4 = {
    name: 'Category 4',
  };

  await inMemoryCategoriesRepository.createCategory(category4);

  const category5 = {
    name: 'Category 5',
  };

  await inMemoryCategoriesRepository.createCategory(category5);
}
