import { beforeEach, describe, expect, it } from 'vitest';

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

    expect(result.data.length).toEqual(1);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(1);
    expect(result.pagination.pageCount).toEqual(1);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(false);
  });
});

async function mockListCategories() {
  await inMemoryCategoriesRepository.create({
    name: 'Category 1',
    isActive: true,
  });

  await inMemoryCategoriesRepository.create({
    name: 'Category 2',
    isActive: true,
  });

  await inMemoryCategoriesRepository.create({
    name: 'Category 3',
    isActive: true,
  });

  await inMemoryCategoriesRepository.create({
    name: 'Category 4',
    isActive: true,
  });

  await inMemoryCategoriesRepository.create({
    name: 'Category 5',
    isActive: false,
  });
}
