import { Body, Controller, Post } from '@nestjs/common';

import { CreateOrderDto } from '../../dto/create-order.dto';
import { CreateOrderUseCase } from './create-order.usecase';

@Controller('orders')
export class CreateOrdersController {
  constructor(private readonly createOrder: CreateOrderUseCase) {}

  @Post()
  async handle(@Body() order: CreateOrderDto) {
    await this.createOrder.execute(order);
  }
}
