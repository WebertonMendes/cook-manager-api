import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteOrderUseCase } from './delete-order.usecase';

@Controller('orders')
export class DeleteOrderController {
  constructor(private readonly deleteOrder: DeleteOrderUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteOrder.execute(id);
  }
}
