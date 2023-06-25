import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { CourseStatus } from 'src/common/enums'

@InputType()
export class EnrolmentFilterParams {
  @Field(() => ID, { nullable: true })
  courseId: string

  @Field(() => ID, { nullable: true })
  classId: string

  @Field(() => [CourseStatus], { nullable: true })
  statuses: string[]

  @Field({ nullable: true })
  q: string
}

@InputType()
export class EnrolmentQueryParams extends QueryParams {
  @Field(() => EnrolmentFilterParams, { nullable: true })
  filters: EnrolmentFilterParams
}
