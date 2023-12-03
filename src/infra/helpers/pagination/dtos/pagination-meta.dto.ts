import { PaginationMetaInterface } from '../interfaces/pagination-meta.interface';

export class PaginationMetaDTO {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDTO, itemCount }: PaginationMetaInterface) {
    this.page = pageOptionsDTO.page;
    this.take = pageOptionsDTO.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
