import { Injectable } from '@nestjs/common';

import { CreateCategoryDto } from '../../dto/create-category.dto';
import { CategoryAlreadyExistsException } from '../../exceptions/category-already-exists-exception';
import { CategoriesRepository } from '../../repositories/categories.repository';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(category: CreateCategoryDto): Promise<void> {
    const categoryWithSameName = await this.categoriesRepository.findByName(
      category.name,
    );

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsException(category.name);
    }

    await this.categoriesRepository.createCategory(category);
  }
}
