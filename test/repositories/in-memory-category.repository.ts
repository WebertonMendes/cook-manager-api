import { CategoryResponseDto } from '@/modules/categories/dto/category-response.dto';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@/modules/categories/dto/update-category.dto';
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

  async update(id: string, data: UpdateCategoryDto): Promise<void> {
    const category = this.items.filter((category) => category.id === id)[0];

    Object.keys(data).map((dataKey) => {
      Object.keys(category).map((categoryKey) => {
        if (categoryKey === dataKey) category[categoryKey] = data[dataKey];
      });
    });
  }

  async deleteById(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
