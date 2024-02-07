import { Body, Controller, Param, Post } from '@nestjs/common';

import { AddOrderItemDto } from '../../dto/add-order-item.dto';
import { AddOrderItemUseCase } from './add-order-item.usecase';

@Controller('orders')
export class AddOrderItemController {
  constructor(private readonly addOrderItem: AddOrderItemUseCase) {}

  @Post(':id/add-order-item')
  async handle(@Param('id') id: string, @Body() orderItem: AddOrderItemDto) {
    await this.addOrderItem.execute(id, orderItem);
  }
}
