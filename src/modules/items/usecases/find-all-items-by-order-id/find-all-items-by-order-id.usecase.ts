import { Injectable } from '@nestjs/common';

import { OrderNotFoundException } from '@/modules/orders/exceptions/order-not-found-exception';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { OrderItemsRepository } from '../../repositories/order-items.repository';
import { ListItemsByOrderDto } from '../../dto/list-items-by-order.dto';
import { OrderItemDetailsDto } from '../../dto/order-item-details.dto';
import { OrderItemResponseDto } from '../../dto/order-item-response.dto';
import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';

@Injectable()
export class FindAllItemsByOrderIdUseCase {
  constructor(
    private repository: OrderItemsRepository,
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(orderId: string): Promise<ListItemsByOrderDto> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) throw new OrderNotFoundException(orderId);

    const items = await this.repository.findAllByOrderId(orderId);
    const orderItems = await this.formatOrderItems(items);

    return this.toDto(order, orderItems);
  }

  private async formatOrderItems(
    orderItems: OrderItemResponseDto[],
  ): Promise<OrderItemDetailsDto[]> {
    return await Promise.all(
      orderItems.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId);

        return {
          id: item.id,
          productId: item.productId,
          productName: product.name,
          observation: item.observation,
          quantity: item.quantity,
          price: Number(product.price),
          totalPrice: Number(product.price) * item.quantity,
          status: item.status,
          userId: item.userId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      }),
    );
  }

  private toDto(
    order: OrderResponseDto,
    orderItems: OrderItemDetailsDto[],
  ): ListItemsByOrderDto {
    return {
      id: order.id,
      table: order.table,
      clientId: order.clientId,
      totalPrice: order.totalPrice,
      isFinished: order.isFinished,
      userId: order.userId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: [...orderItems],
    };
  }
}
