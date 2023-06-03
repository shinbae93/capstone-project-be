import { Field, InputType } from '@nestjs/graphql'
import { SortDirection, SortNullDirection } from 'src/common/enums'

@InputType()
export class SortField {
  @Field()
  field: string

  @Field(() => SortDirection)
  direction: 'ASC' | 'DESC'

  @Field(() => SortNullDirection, { nullable: true })
  nulls: 'NULLS FIRST' | 'NULLS LAST'
}

@InputType()
export class PaginateOptions {
  @Field()
  limit: number

  @Field()
  page: number
}

@InputType()
export class QueryParams {
  @Field(() => PaginateOptions, { nullable: true })
  pagination: PaginateOptions

  @Field(() => [SortField], { nullable: true })
  sorting: SortField[]
}
