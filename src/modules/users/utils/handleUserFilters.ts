import { UsersFilterOptionsDto } from '../dto/users-filter-options.dto';

export function handleUserFilters(
  filterOptions: UsersFilterOptionsDto,
): UsersFilterOptionsDto {
  return Object.entries(filterOptions)
    .filter(([, value]) => value !== undefined && value.length > 0)
    .reduce((filter, [key, value]) => {
      filter[key] = key === 'isActive' ? value === 'true' : String(value);
      return filter;
    }, {});
}
