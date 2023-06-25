import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'

@InputType()
export class QuizFilterParams {
  @Field(() => ID, { nullable: true })
  userId: string

  @Field(() => ID, { nullable: true })
  courseId: string

  @Field(() => ID, { nullable: true })
  classId: string
}

@InputType()
export class QuizQueryParams extends QueryParams {
  @Field(() => QuizFilterParams, { nullable: true })
  filters: QuizFilterParams
}
