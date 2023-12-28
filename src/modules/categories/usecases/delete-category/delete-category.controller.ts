import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteCategoryUseCase } from './delete-category.usecase';

@Controller('categories')
export class DeleteCategoryController {
  constructor(private readonly deleteCategory: DeleteCategoryUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteCategory.execute(id);
  }
}
