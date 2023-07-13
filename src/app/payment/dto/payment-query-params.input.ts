import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'

@InputType()
export class PaymentFilterParams {
  @Field(() => ID, { nullable: true })
  classId: string

  @Field(() => ID, { nullable: true })
  courseId: string

  @Field(() => ID, { nullable: true })
  userId: string

  @Field({ nullable: true })
  isAdmin: boolean
}

@InputType()
export class PaymentQueryParams extends QueryParams {
  @Field(() => PaymentFilterParams, { nullable: true })
  filters: PaymentFilterParams
}
