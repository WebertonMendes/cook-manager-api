import { Injectable } from '@nestjs/common';

import { CategoriesRepository } from '../../repositories/categories.repository';
import { CategoryResponseDto } from '../../dto/category-response.dto';
import { CategoryNotFoundException } from '../../exceptions/category-not-found-exception';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(id: string): Promise<CategoryResponseDto> {
    const category = await this.repository.findById(id);

    if (!category) throw new CategoryNotFoundException(id);

    return category;
  }
}
