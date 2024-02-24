import { OrderItemDetailsDto } from './order-item-details.dto';

export class ListItemsByOrderDto {
  id: string;
  table: number;
  clientId: number;
  totalPrice: number;
  isFinished: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemDetailsDto[];
}
