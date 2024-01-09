import { ProductsFilterOptionsDto } from '../dto/products-filter-options.dto';

export function handleProductFilters(
  filterOptions: ProductsFilterOptionsDto,
): ProductsFilterOptionsDto {
  return Object.entries(filterOptions)
    .filter(([, value]) => value !== undefined && value.length > 0)
    .reduce((filter, [key, value]) => {
      filter[key] = key === 'isActive' ? value === 'true' : String(value);
      return filter;
    }, {});
}
