import { Field, InputType, Int } from '@nestjs/graphql'
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
  @Field(() => Int, { description: 'Default value is 20' })
  limit: number

  @Field(() => Int, { description: 'Default value is 1' })
  page: number
}

@InputType()
export class QueryParams {
  @Field(() => PaginateOptions, {
    nullable: true,
    defaultValue: {
      limit: 20,
      page: 1,
    },
  })
  pagination: PaginateOptions

  @Field(() => [SortField], { nullable: true })
  sorting: SortField[]
}
