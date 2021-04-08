import { filter, FilterName } from '@/filters'

export const formatter = (filterName: FilterName, ...args: any[]) => {
  return (row: any, column: any, cellValue: string, index: number) => {
    return filter(filterName, cellValue, ...args)
  }
}
