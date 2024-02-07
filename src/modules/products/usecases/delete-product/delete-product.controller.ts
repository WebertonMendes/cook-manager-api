import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteProductUseCase } from './delete-product.usecase';

@Controller('products')
export class DeleteProductController {
  constructor(private readonly deleteProduct: DeleteProductUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteProduct.execute(id);
  }
}
