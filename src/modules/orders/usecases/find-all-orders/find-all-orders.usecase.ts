import { Injectable } from '@nestjs/common';

import {
  handleFormatFilters,
  validateBooleanValue,
} from '@/infra/helpers/filters/formatFilters';
import { handlerPagination } from '@/infra/helpers/pagination/utils/handlerPagination';
import { ListOrdersOptionsDto } from '../../dto/list-orders-options.dto';
import { ListOrdersResponseDto } from '../../dto/list-orders-response.dto';
import { OrdersRepository } from '../../repositories/orders.repository';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private repository: OrdersRepository) {}

  async execute(options: ListOrdersOptionsDto): Promise<ListOrdersResponseDto> {
    const filters = handleFormatFilters({
      table: options.table,
      clientId: options.clientId,
      isFinished: validateBooleanValue(options.isFinished),
    });

    const pagination = handlerPagination({
      take: options.take,
      order: options.order,
      page: options.page,
    });

    return await this.repository.findAll(filters, pagination);
  }
}
