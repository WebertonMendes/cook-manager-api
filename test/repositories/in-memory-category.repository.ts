import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: CategoryEntity[] = [];

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

  async createCategory(data: CreateCategoryDto): Promise<void> {
    const category = new CategoryEntity({
      name: data.name,
      isActive: data.isActive,
    });

    this.items.push(category);
  }
}
