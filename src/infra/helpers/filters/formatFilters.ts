type FilteredOptions<T> = {
  [K in keyof T]: T[K] extends string | undefined ? string : T[K];
};

export function handleFormatFilters<T>(filterOptions: T): FilteredOptions<T> {
  return Object.entries(filterOptions)
    .filter(([, value]) => value !== undefined)
    .reduce((filter, [key, value]) => {
      filter[key] = value;
      return filter;
    }, {} as FilteredOptions<T>);
}

export function validateBooleanValue(value: boolean): boolean | undefined {
  let convertedValue = undefined;

  if (['true'].includes(`${value}`)) convertedValue = true;
  if (['false'].includes(`${value}`)) convertedValue = false;

  return convertedValue;
}
