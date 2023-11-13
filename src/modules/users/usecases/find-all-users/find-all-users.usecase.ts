import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../../repositories/users.repository';
import { UsersFilterOptionsDto } from '../../dto/users-filter-options.dto';
import { UserResponseDto } from '../../dto/user-response.dto';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(filters: UsersFilterOptionsDto): Promise<UserResponseDto[]> {
    return await this.userRepository.findAll(filters);
  }
}
