import { Field, ID, InputType } from '@nestjs/graphql'
import { CourseStatus } from 'src/common/enums'
import { Course } from 'src/database/entities/course.entity'
import { EntityExists } from 'src/decorator/entity-exists.decorator'

@InputType()
export class UpdateCourseStatusInput {
  @EntityExists(Course)
  @Field(() => ID)
  id: string

  @Field(() => CourseStatus)
  status: string
}
