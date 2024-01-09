import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';

export class ListProductsOptionsDto extends PaginationOptionsDTO {
  name?: string;
  categoryId?: string;
  isActive?: boolean;
}
