import { PaginationOptionsDTO } from '../dtos/pagination-options.dto';

export interface PaginationMetaInterface {
  pageOptionsDTO: PaginationOptionsDTO;
  itemCount: number;
}
