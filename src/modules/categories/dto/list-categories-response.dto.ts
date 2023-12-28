import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { CategoryResponseDto } from './category-response.dto';

export class ListCategoriesResponseDto {
  data: CategoryResponseDto[];
  pagination: PaginationMetaDTO;
}
