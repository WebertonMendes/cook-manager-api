import { Injectable } from '@nestjs/common';

import { UpdateOrderItemDto } from '../../dto/update-order-item.dto';
import { OrderItemNotFoundException } from '../../exceptions/order-item-not-found-exception';
import { OrderItemsRepository } from '../../repositories/order-items.repository';
import { RefreshOrderPriceUseCase } from '@/modules/orders/usecases/refresh-order-price/refresh-order-price.usecase';

@Injectable()
export class UpdateOrderItemUseCase {
  constructor(
    private repository: OrderItemsRepository,
    private refreshOrderPrice: RefreshOrderPriceUseCase,
  ) {}

  async execute(id: string, data: UpdateOrderItemDto): Promise<void> {
    const orderItem = await this.repository.findById(id);

    if (!orderItem) throw new OrderItemNotFoundException(id);

    await this.repository.update(id, data);

    if (data.quantity) {
      await this.refreshOrderPrice.execute(orderItem.orderId);
    }
  }
}
