import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { FindUserByIdUseCase } from './find-user-by-id.usecase';
import { UserNotFoundException } from '../../exceptions/user-not-found-exception';

let inMemoryUsersRepository: InMemoryUsersRepository;
let findUserById: FindUserByIdUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    findUserById = new FindUserByIdUseCase(inMemoryUsersRepository);
  });

  it('should be able to find user by id', async () => {
    const newUser = {
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
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
    const fakeUserId = 'fake-userId';

    try {
      await findUserById.execute(fakeUserId);
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(fakeUserId);
      }).toThrow(UserNotFoundException);
    }
  });
});
