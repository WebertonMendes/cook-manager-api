import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { UpdateUserUseCase } from './update-user.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let updateUser: UpdateUserUseCase;

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    updateUser = new UpdateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to update user data by id', async () => {
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

    expect(savedUser.isActive).toEqual(true);

    await updateUser.execute(savedUser.id, { isActive: false });

    expect(savedUser.isActive).toEqual(false);
    expect(savedUser.username).toEqual(newUser.username);
  });

  it('should be able to throw a UserNotFoundException if the user id not found.', async () => {
    const userId = randomUUID();

    try {
      await updateUser.execute(userId, { isActive: false });
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(userId);
      }).toThrow(UserNotFoundException);
    }
  });
});
