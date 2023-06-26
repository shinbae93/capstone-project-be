import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateBlockStatusUserInput {
  @Field(() => ID)
  id: string

  @Field()
  isBlocked: boolean
}
