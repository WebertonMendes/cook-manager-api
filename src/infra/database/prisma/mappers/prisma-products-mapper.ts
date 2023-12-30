import { Product as PrismaProduct } from '@prisma/client';

import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { ListProductsResponseDto } from '@/modules/products/dto/list-products-response.dto';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';

export class PrismaProductsMapper {
  static toDto(raw: PrismaProduct): ProductResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      price: raw.price,
      imageUrl: raw.imageUrl,
      categoryId: raw.categoryId,
      isActive: raw.isActive,
    };
  }

  static toDtoPaginated(
    data: ProductResponseDto[],
    pagination: PaginationMetaDTO,
  ): ListProductsResponseDto {
    return {
      data,
      pagination,
    };
  }
}
