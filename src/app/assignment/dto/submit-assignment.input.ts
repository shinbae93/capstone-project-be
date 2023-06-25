import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class SubmitAssignmentInput {
  @Field(() => ID)
  id: string

  @Field(() => [String])
  files: string[]
}
