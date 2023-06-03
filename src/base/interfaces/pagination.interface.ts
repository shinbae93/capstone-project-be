import { PaginationMeta } from '../types/pagination.type'

export interface IPagination<T> {
  meta: PaginationMeta
  items: T[]
}
