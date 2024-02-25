import { Injectable } from '@nestjs/common';

import { OrdersRepository } from '../../repositories/orders.repository';
import { OrderItemsRepository } from '@/modules/items/repositories/order-items.repository';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';

@Injectable()
export class RefreshOrderPriceUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(orderId: string): Promise<void> {
    let totalPrice = 0;

    const orderItems =
      await this.orderItemsRepository.findAllByOrderId(orderId);

    const result = orderItems.map(async (item) => {
      const product = await this.productsRepository.findById(item.productId);

      totalPrice += Number(product.price) * item.quantity;

      return Number(totalPrice.toFixed(2));
    });

    const updatePrice = await Promise.all(result);
    const updatedPrice =
      updatePrice.length > 0 ? updatePrice.pop() : totalPrice;

    await this.ordersRepository.update(orderId, { totalPrice: updatedPrice });
  }
}
