import { Injectable } from '@nestjs/common';

import { OrderNotFoundException } from '../../exceptions/order-not-found-exception';
import { OrdersRepository } from '../../repositories/orders.repository';
import { UpdateOrderDto } from '../../dto/update-order.dto';

@Injectable()
export class UpdateOrderUseCase {
  constructor(private repository: OrdersRepository) {}

  async execute(id: string, data: UpdateOrderDto): Promise<void> {
    const order = await this.repository.findById(id);

    if (!order) throw new OrderNotFoundException(id);

    await this.repository.update(id, data);
  }
}
