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
      name: 'Webs System',
      username: 'Webs.System',
      avatarUrl: 'https://github.com/WebertonMendes.png',
      password: 'password123',
    };

    await inMemoryUsersRepository.createUser(newUser);

    const savedUser = await inMemoryUsersRepository.findByUsername(
      newUser.username,
    );

    await deleteUser.execute(savedUser.id);

    const allUsers = inMemoryUsersRepository.items;

    expect(allUsers.length).toEqual(0);
  });

  it('should be able to throw a UserNotFoundException if the user id not found.', async () => {
    const fakeUserId = 'fake-userId';

    try {
      await deleteUser.execute(fakeUserId);
    } catch (error) {
      expect(() => {
        throw new UserNotFoundException(fakeUserId);
      }).toThrow(UserNotFoundException);
    }
  });
});
