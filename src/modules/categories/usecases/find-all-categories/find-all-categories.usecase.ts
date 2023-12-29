import { Injectable } from '@nestjs/common';

import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListCategoriesOptionsDto } from '../../dto/list-categories-options.dto';
import { ListCategoriesResponseDto } from '../../dto/list-categories-response.dto';
import { CategoriesRepository } from '../../repositories/categories.repository';
import { handleCategoriesFilters } from '../../utils/handleCategoryFilters';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(
    options: ListCategoriesOptionsDto,
  ): Promise<ListCategoriesResponseDto> {
    const filters = handleCategoriesFilters({
      name: options.name,
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
