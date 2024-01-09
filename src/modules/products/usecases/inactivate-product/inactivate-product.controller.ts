import { Controller, Delete, Param } from '@nestjs/common';

import { InactivateProductUseCase } from './inactivate-product.usecase';

@Controller('products')
export class InactivateProductController {
  constructor(private readonly inactivateProduct: InactivateProductUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.inactivateProduct.execute(id);
  }
}
