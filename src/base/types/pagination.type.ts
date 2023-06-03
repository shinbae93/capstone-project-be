import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { IPagination } from '../interfaces/pagination.interface'

@ObjectType()
export class PaginationMeta {
  @Field()
  itemCount: number

  @Field()
  totalItems?: number

  @Field()
  itemsPerPage: number

  @Field()
  totalPages?: number

  @Field()
  currentPage: number
}

export function Pagination<T>(classRef: Type<T>): Type<IPagination<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginationType implements IPagination<T> {
    @Field(() => PaginationMeta)
    public meta: PaginationMeta

    @Field(() => [classRef])
    public items: T[]
  }

  return PaginationType as Type<IPagination<T>>
}
