import { CategoriesFilterOptionsDto } from '../dto/categories-filter-options.dto';

export function handleCategoryFilters(
  filterOptions: CategoriesFilterOptionsDto,
): CategoriesFilterOptionsDto {
  return Object.entries(filterOptions)
    .filter(([, value]) => value !== undefined && value.length > 0)
    .reduce((filter, [key, value]) => {
      filter[key] = key === 'isActive' ? value === 'true' : String(value);
      return filter;
    }, {});
}
