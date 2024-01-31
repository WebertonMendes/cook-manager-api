import { beforeEach, describe, expect, it } from 'vitest';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { InMemoryProductsRepository } from 'test/repositories/in-memory-product.repository';
import { FindAllProductsUseCase } from './find-all-products.usecase';

let inMemoryProductsRepository: InMemoryProductsRepository;
let findAllProducts: FindAllProductsUseCase;

describe('Find All Products', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    findAllProducts = new FindAllProductsUseCase(inMemoryProductsRepository);
  });

  it('should be able list all products paginated without filters', async () => {
    await mockListProducts();

    const queryParams = {
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllProducts.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });

  it('should be able list all products paginated with filters', async () => {
    await mockListProducts();

    const queryParams = {
      isActive: false,
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllProducts.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });
});

async function mockListProducts() {
  const product1 = {
    name: 'Chapéu de Algodão',
    description: 'New range of formal shirts are designed.',
    price: 620.99,
    imageUrl: 'https://loremflickr.com/640/480/food',
    categoryId: 'e1aa5e78-a65d-42fc-8968-94392bb24370',
    isActive: true,
  };

  await inMemoryProductsRepository.create(product1);

  const product2 = {
    name: 'Camiseta Madeira',
    description: 'The Apollo tech B340 is an affordable wireless mouse',
    price: 87.15,
    imageUrl: 'https://loremflickr.com/640/480/food',
    categoryId: 'e1aa5e78-a65d-42fc-8968-94392bb24370',
    isActive: true,
  };

  await inMemoryProductsRepository.create(product2);

  const product3 = {
    name: 'Incrível Concreto Salada',
    description: 'Carbonite web goalkeeper gloves are ergonomically',
    price: 180,
    imageUrl: 'https://loremflickr.com/640/480/food',
    categoryId: 'e1aa5e78-a65d-42fc-8968-94392bb24370',
    isActive: true,
  };

  await inMemoryProductsRepository.create(product3);

  const product4 = {
    name: 'Algodão Pequeno',
    description: 'The Nagasaki Lander is the trademarked',
    price: 10,
    imageUrl: 'https://loremflickr.com/640/480/food',
    categoryId: 'e1aa5e78-a65d-42fc-8968-94392bb24370',
    isActive: true,
  };

  await inMemoryProductsRepository.create(product4);

  const product5 = {
    name: 'Carro Pequeno',
    description: 'Ergonomic executive chair upholstered in bonded black',
    price: 75.8,
    imageUrl: 'https://loremflickr.com/640/480/food',
    categoryId: 'e1aa5e78-a65d-42fc-8968-94392bb24370',
    isActive: true,
  };

  await inMemoryProductsRepository.create(product5);
}
