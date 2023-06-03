import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreateCourseInput } from './create-course.input'
import { EntityExists } from 'src/decorators/entity-exists.decorator'
import { Course } from 'src/database/entities/course.entity'

@InputType()
export class UpdateCourseInput extends PartialType(
  OmitType(CreateCourseInput, ['gradeId', 'subjectId', 'isPublished'] as const)
) {
  @EntityExists(Course)
  @Field(() => ID)
  id: string
}
