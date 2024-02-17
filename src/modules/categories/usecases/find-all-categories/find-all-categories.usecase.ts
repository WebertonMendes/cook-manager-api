import { Injectable } from '@nestjs/common';

import {
  handleFormatFilters,
  validateBooleanValue,
} from '@/infra/helpers/filters/formatFilters';
import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListCategoriesOptionsDto } from '../../dto/list-categories-options.dto';
import { ListCategoriesResponseDto } from '../../dto/list-categories-response.dto';
import { CategoriesRepository } from '../../repositories/categories.repository';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(
    options: ListCategoriesOptionsDto,
  ): Promise<ListCategoriesResponseDto> {
    const filters = handleFormatFilters({
      name: options.name,
      isActive: validateBooleanValue(options.isActive),
    });

    const pagination = handlerPagination({
      take: options.take,
      order: options.order,
      page: options.page,
    });

    return await this.repository.findAll(filters, pagination);
  }
}
