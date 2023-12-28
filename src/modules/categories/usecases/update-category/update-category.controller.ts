import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { UpdateCategoryUseCase } from './update-category.usecase';

@Controller('categories')
export class UpdateCategoryController {
  constructor(private readonly updateCategory: UpdateCategoryUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    await this.updateCategory.execute(id, data);
  }
}
