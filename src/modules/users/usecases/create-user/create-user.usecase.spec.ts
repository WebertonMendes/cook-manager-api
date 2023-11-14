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
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
    };

    await createUser.execute(user);

    const savedUser = inMemoryUsersRepository.items[0];

    expect(savedUser.name).toEqual(user.name);
    expect(savedUser.username).toEqual(user.username);
    expect(savedUser).toHaveProperty('id');
  });

  it('should be able to throw a UserAlreadyExistsException if the username already exists.', async () => {
    const user = {
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
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
    await createUser.execute({
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
    });

    const hashedPassword = await fakeHasher.hash('password123');

    const savedUser = inMemoryUsersRepository.items[0];

    expect(savedUser.password).toEqual(hashedPassword);
    expect(savedUser).toHaveProperty('id');
  });
});
