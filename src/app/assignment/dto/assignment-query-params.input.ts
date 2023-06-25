import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'

@InputType()
export class AssignmentFilterParams {
  @Field(() => ID, { nullable: true })
  userId: string

  @Field(() => ID, { nullable: true })
  quizId: string

  @Field(() => ID, { nullable: true })
  courseId: string

  @Field(() => ID, { nullable: true })
  classId: string
}

@InputType()
export class AssignmentQueryParams extends QueryParams {
  @Field(() => AssignmentFilterParams, { nullable: true })
  filters: AssignmentFilterParams
}
