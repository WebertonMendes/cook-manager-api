import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { ProductResponseDto } from './product-response.dto';

export class ListProductsResponseDto {
  data: ProductResponseDto[];
  pagination: PaginationMetaDTO;
}
