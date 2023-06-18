import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEnrolmentInput {
  @Field(() => ID)
  classId: string
}
