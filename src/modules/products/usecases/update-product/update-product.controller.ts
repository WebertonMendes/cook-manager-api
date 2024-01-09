import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateProductDto } from '../../dto/update-product.dto';
import { UpdateProductUseCase } from './update-product.usecase';

@Controller('products')
export class UpdateProductController {
  constructor(private readonly updateProduct: UpdateProductUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: UpdateProductDto) {
    await this.updateProduct.execute(id, data);
  }
}
