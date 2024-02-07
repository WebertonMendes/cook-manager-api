import { Controller, Patch, Param, Body } from '@nestjs/common';

import { UpdateOrderDto } from '../../dto/update-order.dto';
import { UpdateOrderUseCase } from './update-order.usecase';

@Controller('orders')
export class UpdateOrderController {
  constructor(private readonly updateOrder: UpdateOrderUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    await this.updateOrder.execute(id, data);
  }
}
