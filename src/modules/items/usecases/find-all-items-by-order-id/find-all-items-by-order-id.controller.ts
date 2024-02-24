import { Controller, Get, Param } from '@nestjs/common';

import { FindAllItemsByOrderIdUseCase } from './find-all-items-by-order-id.usecase';

@Controller('orders/items')
export class FindAllItemsByOrderIdController {
  constructor(private readonly findAllItems: FindAllItemsByOrderIdUseCase) {}

  @Get(':orderId')
  async handle(@Param('orderId') orderId: string) {
    return await this.findAllItems.execute(orderId);
  }
}
