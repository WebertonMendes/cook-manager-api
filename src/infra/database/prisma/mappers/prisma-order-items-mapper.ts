import { OrderItems as PrismaOrderItems } from '@prisma/client';

import { formatDate } from '@/infra/helpers/date/format-date.helper';
import { OrderItemResponseDto } from '@/modules/items/dto/order-item-response.dto';

export class PrismaOrderItemsMapper {
  static toDto(raws: PrismaOrderItems[]): OrderItemResponseDto[] {
    return raws.map((raw) => {
      return {
        id: raw.id,
        orderId: raw.orderId,
        productId: raw.productId,
        observation: raw.observation,
        quantity: raw.quantity,
        status: raw.status,
        userId: raw.userId,
        createdAt: formatDate(raw.createdAt),
        updatedAt: formatDate(raw.updatedAt),
      };
    });
  }
}
