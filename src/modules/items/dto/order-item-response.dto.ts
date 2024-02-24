import { $Enums } from '@prisma/client';

export class OrderItemResponseDto {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  observation: string | null;
  status: $Enums.OrderItemStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
