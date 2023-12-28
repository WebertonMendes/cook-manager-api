import { Injectable } from '@nestjs/common';

import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@/modules/categories/dto/update-category.dto';
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
