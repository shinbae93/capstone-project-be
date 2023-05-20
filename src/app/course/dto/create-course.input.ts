import { Field, InputType } from '@nestjs/graphql'
import { CourseStatus } from 'src/common/enums'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'

@InputType()
export class CreateCourseInput {
  @Field()
  name: string

  @Field()
  fee: number

  @Field(() => CourseStatus, { nullable: true, defaultValue: CourseStatus.DRAFT })
  status: string

  @Field()
  startTime: Date

  @Field()
  endTime: Date

  @Field(() => [ScheduleTime])
  schedule: ScheduleTime[]
}
