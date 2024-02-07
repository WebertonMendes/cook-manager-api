import { Injectable } from '@nestjs/common';

import { OrderNotFoundException } from '@/modules/orders/exceptions/order-not-found-exception';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { OrderItemsRepository } from '../../repositories/order-items.repository';
import { ListItemsByOrderDto } from '../../dto/list-items-by-order.dto';
import { OrderItemsDetailsDto } from '../../dto/order-items-details.dto';
import { OrderItemsResponseDto } from '../../dto/order-items-response.dto';
import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';

@Injectable()
export class FindAllItemsByOrderIdUseCase {
  constructor(
    private repository: OrderItemsRepository,
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(id: string): Promise<ListItemsByOrderDto> {
    const order = await this.ordersRepository.findById(id);

    if (!order) throw new OrderNotFoundException(id);

    const items = await this.repository.findAllByOrderId(id);
    const orderItems = await this.formatOrderItems(items);

    return this.toDto(order, orderItems);
  }

  private async formatOrderItems(
    orderItems: OrderItemsResponseDto[],
  ): Promise<OrderItemsDetailsDto[]> {
    return await Promise.all(
      orderItems.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId);

        return {
          productId: item.productId,
          productName: product.name,
          observation: item.observation,
          quantity: item.quantity,
          price: Number(product.price),
          totalPrice: Number(product.price) * item.quantity,
          userId: item.userId,
          updatedAt: item.updatedAt,
        };
      }),
    );
  }

  private toDto(
    order: OrderResponseDto,
    orderItems: OrderItemsDetailsDto[],
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
