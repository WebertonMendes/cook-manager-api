import { Controller, Get, Param } from '@nestjs/common';

import { FindProductByIdUseCase } from './find-product-by-id.usecase';

@Controller('products')
export class FindCategoryByIdController {
  constructor(private readonly findProductById: FindProductByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    return await this.findProductById.execute(id);
  }
}
