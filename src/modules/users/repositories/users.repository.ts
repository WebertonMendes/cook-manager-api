import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UsersFilterOptionsDto } from '../dto/users-filter-options.dto';

export abstract class UsersRepository {
  abstract findAll(filters: UsersFilterOptionsDto): Promise<UserResponseDto[]>;
  abstract findById(id: string): Promise<UserResponseDto | null>;
  abstract findByUsername(username: string): Promise<UserResponseDto | null>;
  abstract createUser(data: CreateUserDto): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
}
