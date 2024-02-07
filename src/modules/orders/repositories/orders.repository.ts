import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { OrderExistsDto } from '../dto/order-exists.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ListOrdersResponseDto } from '../dto/list-orders-response.dto';
import { OrderResponseDto } from '../dto/order-response.dto';
import { OrdersFilterOptionsDto } from '../dto/orders-filter-options.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

export abstract class OrdersRepository {
  abstract findAll(
    filters: OrdersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListOrdersResponseDto>;
  abstract findById(id: string): Promise<OrderResponseDto | null>;
  abstract checkExists(data: OrderExistsDto): Promise<OrderResponseDto | null>;
  abstract create(data: CreateOrderDto): Promise<void>;
  abstract update(id: string, data: UpdateOrderDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
