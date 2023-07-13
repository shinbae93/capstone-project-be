import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateEnrolmentInput {
  @Field(() => ID)
  classId: string

  @Field(() => Int)
  totalMonths: number
}
