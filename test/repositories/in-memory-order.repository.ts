import { formatDate } from '@/infra/helpers/date/format-date.helper';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateOrderDto } from '@/modules/orders/dto/create-order.dto';
import { ListOrdersResponseDto } from '@/modules/orders/dto/list-orders-response.dto';
import { OrderExistsDto } from '@/modules/orders/dto/order-exists.dto';
import { OrderResponseDto } from '@/modules/orders/dto/order-response.dto';
import { OrdersFilterOptionsDto } from '@/modules/orders/dto/orders-filter-options.dto';
import { UpdateOrderDto } from '@/modules/orders/dto/update-order.dto';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { OrdersRepository } from '@/modules/orders/repositories/orders.repository';

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: OrderEntity[] = [];

  async create(data: CreateOrderDto): Promise<void> {
    const order = new OrderEntity({
      table: data.table,
      clientId: data.clientId,
    });

    this.items.push(order);
  }

  async findById(id: string): Promise<OrderResponseDto | null> {
    const order = this.items.find((item) => item.id === id);

    if (!order) return null;

    return this.toDto(order);
  }

  async checkExists(data: OrderExistsDto): Promise<OrderResponseDto | null> {
    const orderExists = this.items.find(
      (item) =>
        item.clientId === data.clientId &&
        item.table === data.table &&
        item.isFinished === data.isFinished,
    );

    if (!orderExists) return null;

    return this.toDto(orderExists);
  }

  async update(id: string, data: UpdateOrderDto): Promise<void> {
    const order = this.items.filter((order) => order.id === id)[0];

    Object.keys(data).map((dataKey) => {
      Object.keys(order).map((orderKey) => {
        if (orderKey === dataKey) order[orderKey] = data[dataKey];
      });
    });
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }

  async findAll(
    filters: OrdersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListOrdersResponseDto> {
    const orders = this.items.filter(
      (orders) =>
        orders.table === filters.table ||
        orders.clientId === filters.clientId ||
        orders.isFinished === filters.isFinished,
    );

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: orders.length > 0 ? orders.length : this.items.length,
    });

    const ordersFormatted =
      orders.length > 0
        ? orders.map((order) => {
            return this.toDto(order);
          })
        : this.items.map((order) => {
            return this.toDto(order);
          });

    const allOrders = ordersFormatted.slice(0, pagination.take);

    return {
      data: allOrders,
      pagination: paginationMeta,
    };
  }

  private toDto(order: OrderEntity): OrderResponseDto | null {
    return {
      id: order.id,
      table: order.table,
      clientId: order.clientId,
      totalPrice: Number(order.totalPrice),
      isFinished: order.isFinished,
      userId: order.userId,
      createdAt: formatDate(order.createdAt),
      updatedAt: formatDate(order.updatedAt),
    };
  }
}
