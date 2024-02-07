import { Injectable } from '@nestjs/common';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateOrderDto } from '@/modules/orders/dto/create-order.dto';
import { ListOrdersResponseDto } from '@/modules/orders/dto/list-orders-response.dto';
import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';
import { OrdersFilterOptionsDto } from '@/modules/orders/dto/orders-filter-options.dto';
import { UpdateOrderDto } from '@/modules/orders/dto/update-order.dto';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';
import { Prisma } from '@prisma/client';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';
import { PrismaService } from '../prisma.service';
import { OrderExistsDto } from '@/modules/orders/dto/order-exists.dto';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: OrdersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListOrdersResponseDto> {
    const orders = await this.prisma.order.findMany({
      where: {
        table: filters.table,
        clientId: filters.clientId,
        isFinished: filters.isFinished,
      },
      orderBy: {
        table:
          pagination.order && pagination.order === Order.DESC
            ? Prisma.SortOrder.desc
            : Prisma.SortOrder.asc,
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    const totalOrders =
      orders.length < 1 ? orders.length : await this.prisma.order.count();

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: totalOrders,
    });

    const ordersFormatted = orders.map(async (order) => {
      const user = await this.prisma.user.findUnique({
        where: { id: order.userId },
      });

      return PrismaOrderMapper.toDto(order, user);
    });

    const ordersResponse = await Promise.all(ordersFormatted);

    return PrismaOrderMapper.toDtoPaginated(ordersResponse, paginationMeta);
  }

  async findById(id: string): Promise<OrderResponseDto | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: order.userId },
    });

    return PrismaOrderMapper.toDto(order, user);
  }

  async checkExists(data: OrderExistsDto): Promise<OrderResponseDto | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        clientId: data.clientId,
        table: data.table,
        isFinished: false,
      },
    });

    if (!order) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: order.userId },
    });

    return PrismaOrderMapper.toDto(order, user);
  }

  async create(data: CreateOrderDto): Promise<void> {
    try {
      await this.prisma.order.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async update(id: string, data: UpdateOrderDto): Promise<void> {
    try {
      await this.prisma.order.update({ where: { id }, data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
