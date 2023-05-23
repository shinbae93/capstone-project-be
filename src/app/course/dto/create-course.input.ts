import { Field, ID, InputType } from '@nestjs/graphql'
import { CourseStatus } from 'src/common/enums'
import { Grade } from 'src/database/entities/grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { EntityExists } from 'src/decorator/entity-exists.decorator'

@InputType()
export class CreateCourseInput {
  @Field()
  name: string

  @Field()
  fee: number

  @Field(() => CourseStatus, { nullable: true, defaultValue: CourseStatus.DRAFT })
  status: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @EntityExists(Grade)
  @Field(() => ID)
  gradeId: string

  @EntityExists(Subject)
  @Field(() => ID)
  subjectId: string
}
