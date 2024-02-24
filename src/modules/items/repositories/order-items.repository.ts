import { AddOrderItemDto } from '../dto/add-order-item.dto';
import { OrderItemResponseDto } from '../dto/order-item-response.dto';
import { UpdateOrderItemDto } from '../dto/update-order-item.dto';

export abstract class OrderItemsRepository {
  abstract findById(id: string): Promise<OrderItemResponseDto>;
  abstract findAllByOrderId(orderId: string): Promise<OrderItemResponseDto[]>;
  abstract findByProductId(productId: string): Promise<OrderItemResponseDto[]>;
  abstract create(data: AddOrderItemDto): Promise<void>;
  abstract update(id: string, data: UpdateOrderItemDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
