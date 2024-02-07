import { Controller, Get, Query } from '@nestjs/common';

import { FindAllOrdersUseCase } from './find-all-orders.usecase';
import { ListOrdersOptionsDto } from '../../dto/list-orders-options.dto';

@Controller('orders')
export class FindAllOrdersController {
  constructor(private readonly findAllOrders: FindAllOrdersUseCase) {}

  @Get()
  async handle(@Query() options: ListOrdersOptionsDto) {
    return await this.findAllOrders.execute(options);
  }
}
