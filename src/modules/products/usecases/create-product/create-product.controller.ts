import { Body, Controller, Post } from '@nestjs/common';

import { CreateProductDto } from '../../dto/create-product.dto';
import { CreateProductUseCase } from './create-product.usecase';

@Controller('products')
export class CreateProductController {
  constructor(private readonly createProduct: CreateProductUseCase) {}

  @Post()
  async handle(@Body() product: CreateProductDto) {
    await this.createProduct.execute(product);
  }
}
