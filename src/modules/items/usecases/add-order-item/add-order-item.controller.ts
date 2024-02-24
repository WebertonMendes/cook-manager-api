import { Body, Controller, Post } from '@nestjs/common';

import { AddOrderItemDto } from '../../dto/add-order-item.dto';
import { AddOrderItemUseCase } from './add-order-item.usecase';

@Controller('orders/items')
export class AddOrderItemController {
  constructor(private readonly addOrderItem: AddOrderItemUseCase) {}

  @Post()
  async handle(@Body() orderItem: AddOrderItemDto) {
    await this.addOrderItem.execute(orderItem);
  }
}
