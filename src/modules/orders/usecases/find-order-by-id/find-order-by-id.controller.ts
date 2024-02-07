import { Controller, Get, Param } from '@nestjs/common';

import { FindOrderByIdUseCase } from './find-order-by-id.usecase';

@Controller('orders')
export class FindOrderByIdController {
  constructor(private readonly findOrderById: FindOrderByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    return await this.findOrderById.execute(id);
  }
}
