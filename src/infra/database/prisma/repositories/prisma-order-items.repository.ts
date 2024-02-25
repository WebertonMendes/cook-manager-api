import { Injectable } from '@nestjs/common';

import { AddOrderItemDto } from '@/modules/items/dto/add-order-item.dto';
import { OrderItemResponseDto } from '@/modules/items/dto/order-item-response.dto';
import { UpdateOrderItemDto } from '@/modules/items/dto/update-order-item.dto';
import { OrderItemsRepository } from '@/modules/items/repositories/order-items.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaOrderItemsMapper } from '../mappers/prisma-order-items-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderItemsRepository implements OrderItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<OrderItemResponseDto> {
    const orderItem = await this.prisma.orderItems.findUnique({
      where: { id },
    });

    if (!orderItem) return null;

    return PrismaOrderItemsMapper.toDto([orderItem])[0];
  }

  async findAllByOrderId(orderId: string): Promise<OrderItemResponseDto[]> {
    const orders = await this.prisma.orderItems.findMany({
      where: {
        orderId,
      },
    });

    return PrismaOrderItemsMapper.toDto(orders);
  }

  async findByProductId(productId: string): Promise<OrderItemResponseDto[]> {
    const orders = await this.prisma.orderItems.findMany({
      where: { productId },
    });

    return PrismaOrderItemsMapper.toDto(orders);
  }

  async create(data: AddOrderItemDto): Promise<void> {
    try {
      await this.prisma.orderItems.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async update(id: string, data: UpdateOrderItemDto): Promise<void> {
    try {
      await this.prisma.orderItems.update({ where: { id }, data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.orderItems.delete({
        where: { id },
      });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
