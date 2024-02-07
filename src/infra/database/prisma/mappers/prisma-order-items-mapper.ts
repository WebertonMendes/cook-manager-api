import { OrderItems as PrismaOrderItems } from '@prisma/client';

import { formatDate } from '@/infra/helpers/date/format-date.helper';
import { OrderItemsResponseDto } from '@/modules/items/dto/order-items-response.dto';

export class PrismaOrderItemsMapper {
  static toDto(raws: PrismaOrderItems[]): OrderItemsResponseDto[] {
    return raws.map((raw) => {
      return {
        orderId: raw.orderId,
        productId: raw.productId,
        observation: raw.observation,
        quantity: raw.quantity,
        userId: raw.userId,
        updatedAt: formatDate(raw.updatedAt),
      };
    });
  }
}
