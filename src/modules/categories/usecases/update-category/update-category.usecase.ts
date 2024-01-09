import { Injectable } from '@nestjs/common';

import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { CategoryNotFoundException } from '../../exceptions/category-not-found-exception';
import { CategoriesRepository } from '../../repositories/categories.repository';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(id: string, data: UpdateCategoryDto): Promise<void> {
    const category = await this.repository.findById(id);

    if (!category) throw new CategoryNotFoundException(id);

    await this.repository.update(id, data);
  }
}
