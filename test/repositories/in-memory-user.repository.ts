import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { ListUsersResponseDto } from '@/modules/users/dto/list-users-response.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { UsersFilterOptionsDto } from '@/modules/users/dto/users-filter-options.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';
import { UserResponseDto } from '../../src/modules/users/dto/user-response.dto';
import { UserEntity } from '../../src/modules/users/entities/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserEntity[] = [];

  async findAll(
    filters: UsersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListUsersResponseDto> {
    const users = this.items.filter(
      (user) =>
        user.name.includes(filters.name) ||
        user.username.includes(filters.username) ||
        user.role.includes(filters.role) ||
        user.isActive === filters.isActive,
    );

    const allUsers = this.items.slice(0, pagination.take);

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: users.length > 0 ? users.length : this.items.length,
    });

    return {
      data: users.length > 0 ? users : allUsers,
      pagination: paginationMeta,
    };
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async findByUsername(username: string): Promise<UserResponseDto | null> {
    const user = this.items.find((item) => item.username === username);

    if (!user) return null;

    return user;
  }

  async create(data: CreateUserDto): Promise<void> {
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

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
