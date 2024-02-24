import { $Enums } from '@prisma/client';

export class OrderItemDetailsDto {
  id: string;
  productId: string;
  productName: string;
  observation: string | null;
  quantity: number;
  price: number;
  totalPrice: number;
  status: $Enums.OrderItemStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
