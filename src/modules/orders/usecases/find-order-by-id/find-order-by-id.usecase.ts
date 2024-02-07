import { Injectable } from '@nestjs/common';

import { OrdersRepository } from '../../repositories/orders.repository';
import { OrderResponseDto } from '../../dto/order-response.dto';
import { OrderNotFoundException } from '../../exceptions/order-not-found-exception';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private repository: OrdersRepository) {}

  async execute(id: string): Promise<OrderResponseDto> {
    const order = await this.repository.findById(id);

    if (!order) throw new OrderNotFoundException(id);

    return order;
  }
}
