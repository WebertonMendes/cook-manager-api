import { Injectable } from '@nestjs/common';

import { OrderItemsRepository } from '../../repositories/order-items.repository';
import { OrderItemNotFoundException } from '../../exceptions/order-item-not-found-exception';
import { $Enums } from '@prisma/client';
import { OrderItemInProgressException } from '../../exceptions/order-item-in-progress-exception';
import { RefreshOrderPriceUseCase } from '@/modules/orders/usecases/refresh-order-price/refresh-order-price.usecase';

@Injectable()
export class DeleteOrderItemUseCase {
  constructor(
    private repository: OrderItemsRepository,
    private refreshOrderPrice: RefreshOrderPriceUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    const orderItem = await this.repository.findById(id);

    if (!orderItem) throw new OrderItemNotFoundException(id);

    if (orderItem.status !== $Enums.OrderItemStatus.PENDING)
      throw new OrderItemInProgressException(orderItem.id);

    await this.repository.delete(id);
    await this.refreshOrderPrice.execute(orderItem.orderId);
  }
}
