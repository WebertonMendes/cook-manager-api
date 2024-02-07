import { Injectable } from '@nestjs/common';

import { OrderIsFinishedException } from '../../exceptions/order-is-finished-exception';
import { OrderNotFoundException } from '../../exceptions/order-not-found-exception';
import { OrdersRepository } from '../../repositories/orders.repository';
import { OrderInProgressException } from '../../exceptions/order-in-progress-exception';
import { OrderResponseDto } from '../../dto/order-response.dto';

@Injectable()
export class DeleteOrderUseCase {
  constructor(private repository: OrdersRepository) {}

  async execute(id: string): Promise<void> {
    const order = await this.repository.findById(id);
    this.validate(id, order);

    await this.repository.delete(id);
  }

  private validate(id: string, order: OrderResponseDto) {
    this.validateOrderExists(id, order);
    this.validateOrderInProgress(id, order);
    this.validateOrderFinished(id, order);
  }

  private validateOrderExists(id: string, order: OrderResponseDto) {
    if (!order) throw new OrderNotFoundException(id);
  }

  private validateOrderInProgress(id: string, order: OrderResponseDto) {
    if (!order.isFinished && order.totalPrice)
      throw new OrderInProgressException(id);
  }

  private validateOrderFinished(id: string, order: OrderResponseDto) {
    if (order.isFinished) throw new OrderIsFinishedException(id);
  }
}
