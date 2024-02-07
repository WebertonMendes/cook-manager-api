import { Controller, Get, Param } from '@nestjs/common';

import { FindAllItemsByOrderIdUseCase } from './find-all-items-by-order-id.usecase';

@Controller('orders')
export class FindAllItemsByOrderIdController {
  constructor(private readonly findAllItems: FindAllItemsByOrderIdUseCase) {}

  @Get(':id/list-items')
  async handle(@Param('id') id: string) {
    return await this.findAllItems.execute(id);
  }
}
