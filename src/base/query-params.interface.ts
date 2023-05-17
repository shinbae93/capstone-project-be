export interface SortField {
  field: string
  direction: 'ASC' | 'DESC'
  nulls?: 'NULLS FIRST' | 'NULLS LAST'
}

export interface PaginateOptions {
  limit: number
  page: number
}

export interface QueryParams {
  pagination: PaginateOptions
  sorting: SortField[]
}
