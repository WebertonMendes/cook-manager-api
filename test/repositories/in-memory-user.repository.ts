import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';
import { UserResponseDto } from '../../src/modules/users/dto/user-response.dto';
import { UserEntity } from '../../src/modules/users/entities/user.entity';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserEntity[] = [];

  async findById(id: string): Promise<UserResponseDto> {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async findByUsername(username: string): Promise<UserResponseDto | null> {
    const user = this.items.find((item) => item.username === username);

    if (!user) return null;

    return user;
  }

  async createUser(data: CreateUserDto): Promise<void> {
    const user = new UserEntity({
      name: data.name,
      username: data.username,
      avatarUrl: data.avatarUrl,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    });

    this.items.push(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<void> {
    const user = this.items.filter((user) => user.id === id)[0];

    Object.keys(data).map((dataKey) => {
      Object.keys(user).map((userKey) => {
        if (userKey === dataKey) user[userKey] = data[dataKey];
      });
    });
  }

  async deleteById(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
