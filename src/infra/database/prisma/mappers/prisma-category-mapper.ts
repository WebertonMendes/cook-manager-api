import { Category as PrismaCategory } from '@prisma/client';

import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { ListCategoriesResponseDto } from '@/modules/categories/dto/list-categories-response.dto';

export class PrismaCategoryMapper {
  static toDto(raw: PrismaCategory): CategoryResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      isActive: raw.isActive,
    };
  }

  static toDtoPaginated(
    data: CategoryResponseDto[],
    pagination: PaginationMetaDTO,
  ): ListCategoriesResponseDto {
    return {
      data,
      pagination,
    };
  }
}
