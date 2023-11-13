import { OrderOptions } from './order-options';

export interface PaginationParams {
  order?: OrderOptions;
  page?: number;
  take?: number;
}
