import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';

import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists-exception';
import { CreateUserUseCase } from './create-user.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;

let createUser: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    createUser = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it('should be able to create a new user', async () => {
    const user = {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.url(),
      password: faker.internet.password(),
    };

    await createUser.execute(user);

    const savedUser = inMemoryUsersRepository.items[0];

    expect(savedUser.name).toEqual(user.name);
    expect(savedUser.username).toEqual(user.username);
    expect(savedUser).toHaveProperty('id');
  });

  it('should be able to throw a UserAlreadyExistsException if the username already exists.', async () => {
    const user = {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.url(),
      password: faker.internet.password(),
    };

    try {
      await createUser.execute(user);
      await createUser.execute(user);
    } catch (error) {
      expect(() => {
        throw new UserAlreadyExistsException(user.username);
      }).toThrow(UserAlreadyExistsException);
    }
  });

  it('should hash user password upon registration', async () => {
    const mockedPassword = faker.internet.password();

    await createUser.execute({
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.url(),
      password: mockedPassword,
    });

    const hashedPassword = await fakeHasher.hash(mockedPassword);

    const savedUser = inMemoryUsersRepository.items[0];

    expect(savedUser.password).toEqual(hashedPassword);
    expect(savedUser).toHaveProperty('id');
  });
});
