import { Injectable } from '@nestjs/common';

import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListProductsOptionsDto } from '../../dto/list-products-options.dto';
import { ListProductsResponseDto } from '../../dto/list-products-response.dto';
import { ProductsRepository } from '../../repositories/products.repository';
import { handleProductFilters } from '../../utils/handleProductFilters';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private repository: ProductsRepository) {}

  async execute(
    options: ListProductsOptionsDto,
  ): Promise<ListProductsResponseDto> {
    const filters = handleProductFilters({
      name: options.name,
      categoryId: options.categoryId,
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
