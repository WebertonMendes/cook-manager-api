import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteOrderItemUseCase } from './delete-order-item.usecase';

@Controller('orders/items')
export class DeleteOrderItemController {
  constructor(private readonly deleteOrderItem: DeleteOrderItemUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteOrderItem.execute(id);
  }
}
