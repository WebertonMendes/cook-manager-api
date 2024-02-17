import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { FindUserByIdUseCase } from './find-user-by-id.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let findUserById: FindUserByIdUseCase;

describe('Find user by ID', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    findUserById = new FindUserByIdUseCase(inMemoryUsersRepository);
  });

  it('should be able to find user by id', async () => {
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

    const user = await findUserById.execute(savedUser.id);

    expect(savedUser.id).toEqual(user.id);
    expect(savedUser.name).toEqual(user.name);
    expect(savedUser.username).toEqual(user.username);
  });

  it('should be able to throw a UserNotFoundException if the user id not found.', async () => {
    const userId = randomUUID();

    try {
      await findUserById.execute(userId);
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(userId);
      }).toThrow(UserNotFoundException);
    }
  });
});
