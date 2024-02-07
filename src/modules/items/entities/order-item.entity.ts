import { OrderItems } from '@prisma/client';

export class OrderItemsEntity implements OrderItems {
  orderId: string;
  productId: string;
  quantity: number;
  observation: string | null;
  userId: string;
  updatedAt: Date;

  constructor(order?: Partial<OrderItemsEntity>) {
    this.orderId = order?.orderId;
    this.productId = order?.productId;
    this.quantity = order?.quantity;
    this.observation = order?.observation;
    this.userId = order?.userId;
    this.updatedAt = new Date();
  }
}
