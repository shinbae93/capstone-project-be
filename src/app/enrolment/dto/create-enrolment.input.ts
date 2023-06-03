import { InputType, Field, ID } from '@nestjs/graphql'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CreateEnrolmentInput {
  @EntityExists(Course)
  @Field(() => ID)
  courseId: string

  @EntityExists(Class)
  @Field(() => ID)
  classId: string
}
