import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ListUsersResponseDto } from '../dto/list-users-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UsersFilterOptionsDto } from '../dto/users-filter-options.dto';

export abstract class UsersRepository {
  abstract findAll(
    filters: UsersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListUsersResponseDto>;
  abstract findById(id: string): Promise<UserResponseDto | null>;
  abstract findByUsername(username: string): Promise<UserResponseDto | null>;
  abstract create(data: CreateUserDto): Promise<void>;
  abstract update(id: string, data: UpdateUserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
