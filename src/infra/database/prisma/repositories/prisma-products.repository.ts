import { Injectable } from '@nestjs/common';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ListProductsResponseDto } from '@/modules/products/dto/list-products-response.dto';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';
import { ProductsFilterOptionsDto } from '@/modules/products/dto/products-filter-options.dto';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { Prisma } from '@prisma/client';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: ProductsFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListProductsResponseDto> {
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: filters.name,
          mode: 'insensitive',
        },
        categoryId: filters.categoryId,
        isActive: filters.isActive,
      },
      orderBy: {
        name:
          pagination.order && pagination.order === Order.DESC
            ? Prisma.SortOrder.desc
            : Prisma.SortOrder.asc,
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    const totalProducts =
      products.length < 1 ? products.length : await this.prisma.product.count();

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: totalProducts,
    });

    const productsResponse = products.map((product) =>
      PrismaProductMapper.toDto(product),
    );

    return PrismaProductMapper.toDtoPaginated(productsResponse, paginationMeta);
  }

  async findById(id: string): Promise<ProductResponseDto | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return PrismaProductMapper.toDto(product);
  }

  async create(data: CreateProductDto): Promise<void> {
    try {
      await this.prisma.product.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
