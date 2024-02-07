import { Order as PrismaOrder, User as PrismaUser } from '@prisma/client';

import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { ListOrdersResponseDto } from '@/modules/orders/dto/list-orders-response.dto';
import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';
import { formatDate } from '@/infra/helpers/date/format-date.helper';

export class PrismaOrderMapper {
  static toDto(raw: PrismaOrder, user: PrismaUser): OrderResponseDto {
    return {
      id: raw.id,
      table: raw.table,
      clientId: raw.clientId,
      totalPrice: Number(raw.totalPrice),
      isFinished: raw.isFinished,
      userId: user.id,
      createdAt: formatDate(raw.createdAt),
      updatedAt: formatDate(raw.updatedAt),
    };
  }

  static toDtoPaginated(
    data: OrderResponseDto[],
    pagination: PaginationMetaDTO,
  ): ListOrdersResponseDto {
    return {
      data,
      pagination,
    };
  }
}
