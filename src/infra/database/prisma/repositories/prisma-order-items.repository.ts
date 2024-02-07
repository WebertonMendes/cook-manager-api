import { Injectable } from '@nestjs/common';

import { OrderItemsRepository } from '@/modules/items/repositories/order-items.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaService } from '../prisma.service';
import { CreateOrderItemDto } from '@/modules/items/dto/create-order-item.dto';
import { PrismaOrderItemsMapper } from '../mappers/prisma-order-items-mapper';
import { OrderItemsResponseDto } from '@/modules/items/dto/order-items-response.dto';

@Injectable()
export class PrismaOrderItemsRepository implements OrderItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderItemDto): Promise<void> {
    try {
      await this.prisma.orderItems.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async findAllByOrderId(orderId: string): Promise<OrderItemsResponseDto[]> {
    const orders = await this.prisma.orderItems.findMany({
      where: {
        orderId,
      },
    });

    return PrismaOrderItemsMapper.toDto(orders);
  }

  async findByProductId(productId: string): Promise<OrderItemsResponseDto[]> {
    const orders = await this.prisma.orderItems.findMany({
      where: { productId },
    });

    return PrismaOrderItemsMapper.toDto(orders);
  }
}
