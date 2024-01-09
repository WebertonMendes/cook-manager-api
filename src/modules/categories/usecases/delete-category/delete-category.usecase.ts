import { Injectable } from '@nestjs/common';

import { CategoryNotFoundException } from '../../exceptions/category-not-found-exception';
import { CategoriesRepository } from '../../repositories/categories.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) throw new CategoryNotFoundException(id);

    await this.repository.delete(id);
  }
}
