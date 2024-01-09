import { Controller, Get, Query } from '@nestjs/common';

import { FindAllProductsUseCase } from './find-all-products.usecase';
import { ListProductsOptionsDto } from '../../dto/list-products-options.dto';

@Controller('products')
export class FindAllProductsController {
  constructor(private readonly findAllProducts: FindAllProductsUseCase) {}

  @Get()
  async handle(@Query() options: ListProductsOptionsDto) {
    return await this.findAllProducts.execute(options);
  }
}
