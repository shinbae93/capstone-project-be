import { Field, ID, InputType } from '@nestjs/graphql'
import { CreateTutorRequestInput } from './create-tutor-request.input'

@InputType()
export class UpdateTutorRequestInput extends CreateTutorRequestInput {
  @Field(() => ID)
  id: string
}
