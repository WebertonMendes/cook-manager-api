import { Injectable } from '@nestjs/common';

import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListOrdersOptionsDto } from '../../dto/list-orders-options.dto';
import { ListOrdersResponseDto } from '../../dto/list-orders-response.dto';
import { OrdersRepository } from '../../repositories/orders.repository';
import { handleOrderFilters } from '../../utils/handleOrderFilters';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private repository: OrdersRepository) {}

  async execute(options: ListOrdersOptionsDto): Promise<ListOrdersResponseDto> {
    console.log('options: ', options);
    const filters = handleOrderFilters({
      table: options.table,
      clientId: options.clientId,
      isFinished: options.isFinished,
    });
    console.log('filters: ', filters);

    const pagination = handlerPagination({
      take: options.take,
      order: options.order,
      page: options.page,
    });

    return await this.repository.findAll(filters, pagination);
  }
}
