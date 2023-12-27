import { Body, Controller, Post } from '@nestjs/common';

import { CreateCategoryDto } from '../../dto/create-category.dto';
import { CreateCategoryUseCase } from './create-category.usecase';

@Controller('categories')
export class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  async handle(@Body() category: CreateCategoryDto) {
    await this.createCategoryUseCase.execute(category);
  }
}
