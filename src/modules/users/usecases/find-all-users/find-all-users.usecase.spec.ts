import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { FindAllUsersUseCase } from './find-all-users.usecase';
import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { UserRole } from '@prisma/client';

let inMemoryUsersRepository: InMemoryUsersRepository;
let findAllUsers: FindAllUsersUseCase;

describe('Find All Users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    findAllUsers = new FindAllUsersUseCase(inMemoryUsersRepository);
  });

  it('should be able list all users paginated without filters', async () => {
    await mockListUsers();

    const queryParams = {
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllUsers.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });

  it('should be able list all users paginated with filters', async () => {
    await mockListUsers();

    const queryParams = {
      isActive: false,
      order: Order.ASC,
      take: 3,
      page: 1,
    };

    const result = await findAllUsers.execute(queryParams);

    expect(result.data.length).toEqual(3);
    expect(result.pagination.take).toEqual(3);
    expect(result.pagination.page).toEqual(1);
    expect(result.pagination.itemCount).toEqual(5);
    expect(result.pagination.pageCount).toEqual(2);
    expect(result.pagination.hasPreviousPage).toEqual(false);
    expect(result.pagination.hasNextPage).toEqual(true);
  });
});

async function mockListUsers() {
  const user1 = {
    name: 'User 1',
    username: 'username1',
    avatarUrl: 'https://github.com/user1.png',
    role: UserRole.ADMIN,
    password: 'password123',
  };

  await inMemoryUsersRepository.createUser(user1);

  const user2 = {
    name: 'User 2',
    username: 'username2',
    avatarUrl: 'https://github.com/user2.png',
    role: UserRole.KITCHEN,
    password: 'password123',
  };

  await inMemoryUsersRepository.createUser(user2);

  const user3 = {
    name: 'User 3',
    username: 'username3',
    avatarUrl: 'https://github.com/user3.png',
    role: UserRole.KITCHEN,
    password: 'password123',
  };

  await inMemoryUsersRepository.createUser(user3);

  const user4 = {
    name: 'User 4',
    username: 'username4',
    avatarUrl: 'https://github.com/user4.png',
    role: UserRole.SERVICE,
    password: 'password123',
  };

  await inMemoryUsersRepository.createUser(user4);

  const user5 = {
    name: 'User 5',
    username: 'username5',
    avatarUrl: 'https://github.com/user5.png',
    role: UserRole.SERVICE,
    password: 'password123',
    isActive: false,
  };

  await inMemoryUsersRepository.createUser(user5);
}
