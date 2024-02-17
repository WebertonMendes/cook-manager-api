import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { DeleteUserUseCase } from './delete-user.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let deleteUser: DeleteUserUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    deleteUser = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to delete user by id', async () => {
    const newUser = {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.url(),
      password: faker.internet.password(),
    };

    await inMemoryUsersRepository.create(newUser);

    const savedUser = await inMemoryUsersRepository.findByUsername(
      newUser.username,
    );

    await deleteUser.execute(savedUser.id);

    const allUsers = inMemoryUsersRepository.items;

    expect(allUsers.length).toEqual(0);
  });

  it('should be able to throw a UserNotFoundException if the user id not found.', async () => {
    const userId = randomUUID();

    try {
      await deleteUser.execute(userId);
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(userId);
      }).toThrow(UserNotFoundException);
    }
  });
});
