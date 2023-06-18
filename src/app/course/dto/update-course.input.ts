import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreateCourseInput } from './create-course.input'

@InputType()
export class UpdateCourseInput extends PartialType(OmitType(CreateCourseInput, ['isPublished'] as const)) {
  @Field(() => ID)
  id: string
}
