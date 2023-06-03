import { Field, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { CourseStatus } from 'src/common/enums'

@InputType()
export class CourseQueryParams extends QueryParams {
  @Field(() => [CourseStatus], { nullable: true })
  statuses: string[]
}
