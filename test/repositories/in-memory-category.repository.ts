import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CategoriesFilterOptionsDto } from '@/modules/categories/dto/categories-filter-options.dto';
import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { ListCategoriesResponseDto } from '@/modules/categories/dto/list-categories-response.dto';
import { UpdateCategoryDto } from '@/modules/categories/dto/update-category.dto';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: CategoryEntity[] = [];

  async findAll(
    filters: CategoriesFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListCategoriesResponseDto> {
    const categories = this.items.filter(
      (category) =>
        category.name.includes(filters.name) ||
        category.isActive === filters.isActive,
    );

    const allCategories = this.items.slice(0, pagination.take);

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: categories.length > 0 ? categories.length : this.items.length,
    });

    return {
      data: categories.length > 0 ? categories : allCategories,
      pagination: paginationMeta,
    };
  }

  async findByName(name: string): Promise<CategoryResponseDto | null> {
    const category = this.items.find((item) => item.name === name);

    if (!category) return null;

    return category;
  }

  async findById(id: string): Promise<CategoryResponseDto | null> {
    const category = this.items.find((item) => item.id === id);

    if (!category) return null;

    return category;
  }

  async create(data: CreateCategoryDto): Promise<void> {
    const category = new CategoryEntity({
      name: data.name,
      isActive: data.isActive,
    });

    this.items.push(category);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<void> {
    const category = this.items.filter((category) => category.id === id)[0];

    Object.keys(data).map((dataKey) => {
      Object.keys(category).map((categoryKey) => {
        if (categoryKey === dataKey) category[categoryKey] = data[dataKey];
      });
    });
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
