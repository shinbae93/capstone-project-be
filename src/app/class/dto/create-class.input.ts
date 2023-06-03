import { InputType, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { ClassMethod } from 'src/common/enums'
import { Course } from 'src/database/entities/course.entity'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'
import { EntityExists } from 'src/decorators/entity-exists.decorator'
import { ValidateSchedule } from 'src/decorators/validate-schedule.decorator'

@InputType()
export class CreateClassInput {
  @Field()
  name: string

  @Field(() => ClassMethod)
  method: string

  @Type(() => ScheduleTime)
  @ValidateNested({ each: true })
  @ValidateSchedule()
  @Field(() => [ScheduleTime])
  schedule: ScheduleTime[]

  @EntityExists(Course)
  @Field()
  courseId: string
}
