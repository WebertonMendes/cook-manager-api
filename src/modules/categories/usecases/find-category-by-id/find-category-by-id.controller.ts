import { Controller, Get, Param } from '@nestjs/common';

import { FindCategoryByIdUseCase } from './find-category-by-id.usecase';

@Controller('categories')
export class FindUserByIdController {
  constructor(private readonly findCategoryById: FindCategoryByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    return await this.findCategoryById.execute(id);
  }
}
