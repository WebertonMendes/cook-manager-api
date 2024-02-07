import { Order, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export class OrderEntity implements Order {
  id: string;
  table: number;
  clientId: number;
  totalPrice: Prisma.Decimal | null;
  isFinished: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(order?: Partial<OrderEntity>) {
    this.id = order.id ?? randomUUID();
    this.table = order?.table;
    this.clientId = order?.clientId;
    this.totalPrice = order?.totalPrice
      ? new Prisma.Decimal(order?.totalPrice)
      : new Prisma.Decimal(0.0);
    this.isFinished = order?.isFinished ?? false;
    this.userId = order?.userId;
    this.createdAt = order?.createdAt ?? new Date();
    this.updatedAt = new Date();
  }
}
