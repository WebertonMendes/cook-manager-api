import { Injectable } from '@nestjs/common';

import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListUsersOptionsDto } from '../../dto/list-users-options.dto';
import { ListUsersResponseDto } from '../../dto/list-users-response.dto';
import { UsersRepository } from '../../repositories/users.repository';
import { handleUserFilters } from '../../utils/handleUserFilters';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(options: ListUsersOptionsDto): Promise<ListUsersResponseDto> {
    const filters = handleUserFilters({
      name: options.name,
      username: options.username,
      role: options.role,
      isActive: options.isActive,
    });

    const pagination = handlerPagination({
      take: options.take,
      order: options.order,
      page: options.page,
    });

    return await this.repository.findAll(filters, pagination);
  }
}
