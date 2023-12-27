import { Injectable } from '@nestjs/common';

import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaCategoryMapper } from '../mappers/prisma-categories-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<CategoryResponseDto | null> {
    const category = await this.prisma.category.findUnique({
      where: { name },
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
}
