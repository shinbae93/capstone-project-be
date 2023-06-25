import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class FeedbackAssignmentInput {
  @Field(() => ID)
  id: string

  @Field()
  feedback: string
}
