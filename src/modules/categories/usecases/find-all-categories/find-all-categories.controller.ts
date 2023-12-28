import { Controller, Get, Query } from '@nestjs/common';

import { ListCategoriesOptionsDto } from '../../dto/list-categories-options.dto';
import { FindAllCategoriesUseCase } from './find-all-categories.usecase';

@Controller('categories')
export class FindAllCategoriesController {
  constructor(private readonly findAllCategories: FindAllCategoriesUseCase) {}

  @Get()
  async handle(@Query() options: ListCategoriesOptionsDto) {
    return await this.findAllCategories.execute(options);
  }
}
