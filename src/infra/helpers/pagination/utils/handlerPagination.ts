import { PaginationOptionsDTO } from '../dtos/pagination-options.dto';

export function handlerPagination(
  pageOptions: PaginationOptionsDTO,
): PaginationOptionsDTO {
  return {
    skip: getSkipPagination(pageOptions.page, pageOptions.take),
    take: Number(pageOptions.take),
    order: pageOptions.order,
    page: Number(pageOptions.page),
  };
}

const getSkipPagination = (page: number, take: number): number => {
  return (page - 1) * take;
};
