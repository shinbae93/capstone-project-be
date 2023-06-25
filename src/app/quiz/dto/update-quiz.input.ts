import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreateQuizInput } from './create-quiz.input'

@InputType()
export class UpdateQuizInput extends PartialType(OmitType(CreateQuizInput, ['courseId'] as const)) {
  @Field(() => ID)
  id: string
}
