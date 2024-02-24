import { $Enums, OrderItems } from '@prisma/client';
import { randomUUID } from 'crypto';

export class OrderItemsEntity implements OrderItems {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  observation: string | null;
  status: $Enums.OrderItemStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(order?: Partial<OrderItemsEntity>) {
    this.id = order.id ?? randomUUID();
    this.orderId = order?.orderId;
    this.productId = order?.productId;
    this.quantity = order?.quantity;
    this.observation = order?.observation;
    this.status = order?.status ?? $Enums.OrderItemStatus.PENDING;
    this.userId = order?.userId;
    this.createdAt = order?.createdAt ?? new Date();
    this.updatedAt = new Date();
  }
}
