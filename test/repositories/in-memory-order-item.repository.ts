import { formatDate } from '@/infra/helpers/date/format-date.helper';
import { CreateOrderItemDto } from '@/modules/items/dto/create-order-item.dto';
import { OrderItemsResponseDto } from '@/modules/items/dto/order-items-response.dto';
import { OrderItemsEntity } from '@/modules/items/entities/order-item.entity';
import { OrderItemsRepository } from '@/modules/items/repositories/order-items.repository';

export class InMemoryOrderItemsRepository implements OrderItemsRepository {
  public items: OrderItemsEntity[] = [];

  async create(data: CreateOrderItemDto): Promise<void> {
    const item = new OrderItemsEntity({
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      observation: data.observation,
      userId: data.userId,
    });

    this.items.push(item);
  }

  async findAllByOrderId(id: string): Promise<OrderItemsResponseDto[] | null> {
    const items = this.items.filter((item) => item.orderId === id);

    if (!items) return null;

    return this.toDto(items);
  }

  async findByProductId(id: string): Promise<OrderItemsResponseDto[] | null> {
    const items = this.items.filter((item) => item.productId === id);

    if (!items) return null;

    return this.toDto(items);
  }

  private toDto(items: OrderItemsEntity[]): OrderItemsResponseDto[] | null {
    const formattedItems = items.map((item) => {
      return {
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        observation: item.observation,
        userId: item.userId,
        updatedAt: formatDate(item.updatedAt),
      };
    });

    return formattedItems;
  }
}
