import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';

export class ListCategoriesOptionsDto extends PaginationOptionsDTO {
  name?: string;
  isActive?: boolean;
}
