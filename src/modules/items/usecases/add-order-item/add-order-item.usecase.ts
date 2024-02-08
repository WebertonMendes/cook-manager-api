import { Injectable } from '@nestjs/common';

import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';
import { OrderIsFinishedException } from '@/modules/orders/exceptions/order-is-finished-exception';
import { OrderNotFoundException } from '@/modules/orders/exceptions/order-not-found-exception';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';
import { ProductInactiveException } from '@/modules/products/exceptions/product-inactive-exception';
import { ProductNotFoundException } from '@/modules/products/exceptions/product-not-found-exception';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { AddOrderItemDto } from '../../dto/add-order-item.dto';
import { OrderItemsRepository } from '../../repositories/order-items.repository';

@Injectable()
export class AddOrderItemUseCase {
  constructor(
    private repository: OrderItemsRepository,
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(orderId: string, orderItem: AddOrderItemDto): Promise<void> {
    const product = await this.productsRepository.findById(orderItem.productId);
    this.validateProduct(orderItem.productId, product);

    const order = await this.ordersRepository.findById(orderId);
    this.validateOrder(orderId, order);

    const newOrderItem = {
      orderId,
      productId: orderItem.productId,
      observation: orderItem.observation,
      quantity: orderItem.quantity,
      userId: orderItem.userId,
    };

    const totalPriceItems = Number(product.price) * orderItem.quantity;
    const totalPrice = order.totalPrice + totalPriceItems;

    await this.repository.create(newOrderItem);
    await this.ordersRepository.update(orderId, { totalPrice });
  }

  private validateProduct(id: string, product: ProductResponseDto) {
    this.validateProductExists(id, product);
    this.validateProductActive(id, product);
  }

  private validateProductExists(id: string, product: ProductResponseDto) {
    if (!product) throw new ProductNotFoundException(id);
  }

  private validateProductActive(id: string, product: ProductResponseDto) {
    if (!product.isActive) throw new ProductInactiveException(id);
  }

  private validateOrder(id: string, order: OrderResponseDto) {
    this.validateOrderExists(id, order);
    this.validateOrderFinished(id, order);
  }

  private validateOrderExists(id: string, product: OrderResponseDto) {
    if (!product) throw new OrderNotFoundException(id);
  }

  private validateOrderFinished(id: string, product: OrderResponseDto) {
    if (product.isFinished) throw new OrderIsFinishedException(id);
  }
}