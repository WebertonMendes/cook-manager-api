import { CategoryResponseDto } from '../dto/category-response.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

export abstract class CategoriesRepository {
  abstract createCategory(data: CreateCategoryDto): Promise<void>;
  abstract findByName(name: string): Promise<CategoryResponseDto | null>;
}
