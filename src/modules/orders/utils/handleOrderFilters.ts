import { OrdersFilterOptionsDto } from '../dto/orders-filter-options.dto';

export function handleOrderFilters(
  filterOptions: OrdersFilterOptionsDto,
): OrdersFilterOptionsDto {
  return Object.entries(filterOptions)
    .filter(([, value]) => value !== undefined)
    .reduce((filter, [key, value]) => {
      filter[key] = value;
      return filter;
    }, {});
}
