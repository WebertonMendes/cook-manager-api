import { formatDate } from '@/infra/helpers/date/format-date.helper';
import { AddOrderItemDto } from '@/modules/items/dto/add-order-item.dto';
import { OrderItemResponseDto } from '@/modules/items/dto/order-item-response.dto';
import { UpdateOrderItemDto } from '@/modules/items/dto/update-order-item.dto';
import { OrderItemsEntity } from '@/modules/items/entities/order-item.entity';
import { OrderItemsRepository } from '@/modules/items/repositories/order-items.repository';

export class InMemoryOrderItemsRepository implements OrderItemsRepository {
  public items: OrderItemsEntity[] = [];

  async findById(id: string): Promise<OrderItemResponseDto | null> {
    const orderItem = this.items.find((item) => item.id === id);

    if (!orderItem) return null;

    return this.toDto([orderItem])[0];
  }

  async findAllByOrderId(id: string): Promise<OrderItemResponseDto[] | null> {
    const items = this.items.filter((item) => item.orderId === id);

    if (!items) return null;

    return this.toDto(items);
  }

  async findByProductId(id: string): Promise<OrderItemResponseDto[] | null> {
    const items = this.items.filter((item) => item.productId === id);

    if (!items) return null;

    return this.toDto(items);
  }

  async create(data: AddOrderItemDto): Promise<void> {
    const item = new OrderItemsEntity({
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      observation: data.observation,
      userId: data.userId,
    });

    this.items.push(item);
  }

  async update(id: string, data: UpdateOrderItemDto): Promise<void> {
    const orderItem = this.items.filter((item) => item.id === id)[0];

    Object.keys(data).map((dataKey) => {
      Object.keys(orderItem).map((itemKey) => {
        if (itemKey === dataKey) orderItem[itemKey] = data[dataKey];
      });
    });
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }

  private toDto(items: OrderItemsEntity[]): OrderItemResponseDto[] | null {
    const formattedItems = items.map((item) => {
      return {
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        observation: item.observation,
        status: item.status,
        userId: item.userId,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
      };
    });

    return formattedItems;
  }
}
