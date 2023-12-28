import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CategoriesFilterOptionsDto } from '@/modules/categories/dto/categories-filter-options.dto';
import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { ListCategoriesResponseDto } from '@/modules/categories/dto/list-categories-response.dto';
import { UpdateCategoryDto } from '@/modules/categories/dto/update-category.dto';
import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaCategoryMapper } from '../mappers/prisma-categories-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: CategoriesFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListCategoriesResponseDto> {
    const categories = await this.prisma.category.findMany({
      where: {
        name: {
          contains: filters.name,
          mode: 'insensitive',
        },
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

    const totalCategories =
      categories.length < 1
        ? categories.length
        : await this.prisma.category.count();

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: totalCategories,
    });

    const categoriesResponse = categories.map((category) =>
      PrismaCategoryMapper.toDto(category),
    );

    return PrismaCategoryMapper.toDtoPaginated(
      categoriesResponse,
      paginationMeta,
    );
  }

  async findByName(name: string): Promise<CategoryResponseDto | null> {
    const category = await this.prisma.category.findUnique({
      where: { name },
    });

    if (!category) return null;

    return PrismaCategoryMapper.toDto(category);
  }

  async findById(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) return null;

    return PrismaCategoryMapper.toDto(category);
  }

  async createCategory(data: CreateCategoryDto): Promise<void> {
    try {
      await this.prisma.category.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async update(id: string, data: UpdateCategoryDto): Promise<void> {
    try {
      await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
