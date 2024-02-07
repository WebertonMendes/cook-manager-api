import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { OrderResponseDto } from './order-response.dto';

export class ListOrdersResponseDto {
  data: OrderResponseDto[];
  pagination: PaginationMetaDTO;
}
