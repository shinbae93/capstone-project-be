import { Field, InputType } from '@nestjs/graphql'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { User } from 'src/database/entities/user.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CreateTutorReportInput {
  @Field()
  reason: string

  @Field(() => [String], { nullable: true })
  files: string[]

  @EntityExists(User)
  @Field()
  tutorId: string

  @EntityExists(Course)
  @Field()
  courseId: string

  @EntityExists(Class)
  @Field()
  classId: string
}
