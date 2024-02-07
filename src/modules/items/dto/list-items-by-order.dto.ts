import { OrderItemsDetailsDto } from './order-items-details.dto';

export class ListItemsByOrderDto {
  id: string;
  table: number;
  clientId: number;
  totalPrice: number;
  isFinished: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemsDetailsDto[];
}
