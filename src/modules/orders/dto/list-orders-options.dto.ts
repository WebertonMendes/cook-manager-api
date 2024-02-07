import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';

export class ListOrdersOptionsDto extends PaginationOptionsDTO {
  table?: number;
  clientId?: number;
  isFinished?: boolean;
}
