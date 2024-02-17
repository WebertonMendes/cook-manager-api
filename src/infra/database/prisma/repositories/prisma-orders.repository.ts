import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Order } from '@/infra/helpers/pagination/constants/order.constants';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateOrderDto } from '@/modules/orders/dto/create-order.dto';
import { ListOrdersResponseDto } from '@/modules/orders/dto/list-orders-response.dto';
import { OrderExistsDto } from '@/modules/orders/dto/order-exists.dto';
import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';
import { OrdersFilterOptionsDto } from '@/modules/orders/dto/orders-filter-options.dto';
import { UpdateOrderDto } from '@/modules/orders/dto/update-order.dto';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: OrdersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListOrdersResponseDto> {
    const queryArgs: Prisma.OrderFindManyArgs = {
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
    };

    const orders = await this.prisma.order.findMany(queryArgs);

    const totalOrders = await this.prisma.order.count({
      where: queryArgs.where,
    });

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
