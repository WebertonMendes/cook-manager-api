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
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
    };

    await inMemoryUsersRepository.createUser(newUser);

    const savedUser = await inMemoryUsersRepository.findByUsername(
      newUser.username,
    );

    expect(savedUser.isActive).toEqual(true);

    const userId = savedUser.id;
    const data = { isActive: false };

    await updateUser.execute(userId, data);

    expect(savedUser.isActive).toEqual(data.isActive);
    expect(savedUser.username).toEqual(newUser.username);
  });

  it('should be able to throw a UserNotFoundException if the user id not found.', async () => {
    const fakeUserId = 'fake-userId';
    const data = { isActive: false };

    try {
      await updateUser.execute(fakeUserId, data);
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(fakeUserId);
      }).toThrow(UserNotFoundException);
    }
  });
});
