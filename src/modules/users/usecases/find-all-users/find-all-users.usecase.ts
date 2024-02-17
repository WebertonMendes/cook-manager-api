import { Injectable } from '@nestjs/common';

import {
  handleFormatFilters,
  validateBooleanValue,
} from '@/infra/helpers/filters/formatFilters';
import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListUsersOptionsDto } from '../../dto/list-users-options.dto';
import { ListUsersResponseDto } from '../../dto/list-users-response.dto';
import { UsersFilterOptionsDto } from '../../dto/users-filter-options.dto';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(options: ListUsersOptionsDto): Promise<ListUsersResponseDto> {
    const filters = handleFormatFilters({
      name: options.name,
      username: options.username,
      role: options.role,
      isActive: validateBooleanValue(options.isActive),
    }) as UsersFilterOptionsDto;

    const pagination = handlerPagination({
      take: options.take,
      order: options.order,
      page: options.page,
    });

    return await this.repository.findAll(filters, pagination);
  }
}
