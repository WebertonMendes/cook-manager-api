import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { OrderItemsResponseDto } from '../dto/order-items-response.dto';

export abstract class OrderItemsRepository {
  abstract create(data: CreateOrderItemDto): Promise<void>;
  abstract findAllByOrderId(orderId: string): Promise<OrderItemsResponseDto[]>;
  abstract findByProductId(productId: string): Promise<OrderItemsResponseDto[]>;
}
