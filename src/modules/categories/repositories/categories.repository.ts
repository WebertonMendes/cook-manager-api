import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CategoriesFilterOptionsDto } from '../dto/categories-filter-options.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ListCategoriesResponseDto } from '../dto/list-categories-response.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export abstract class CategoriesRepository {
  abstract findAll(
    filters: CategoriesFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListCategoriesResponseDto>;
  abstract findByName(name: string): Promise<CategoryResponseDto | null>;
  abstract findById(id: string): Promise<CategoryResponseDto | null>;
  abstract createCategory(data: CreateCategoryDto): Promise<void>;
  abstract update(id: string, data: UpdateCategoryDto): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
}
