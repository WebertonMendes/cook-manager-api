import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateOrderItemUseCase } from './update-order-item.usecase';
import { UpdateOrderItemDto } from '../../dto/update-order-item.dto';

@Controller('orders/items')
export class UpdateOrderItemController {
  constructor(private readonly updateOrderItem: UpdateOrderItemUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() orderItem: UpdateOrderItemDto) {
    await this.updateOrderItem.execute(id, orderItem);
  }
}
