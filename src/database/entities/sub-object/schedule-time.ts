import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsIn, ValidateNested } from 'class-validator'
import { LessonTime } from './lesson-time'

@InputType('ScheduleTimeInput')
@ObjectType()
export class ScheduleTime {
  @IsIn([0, 1, 2, 3, 4, 5, 6])
  @Field({ description: 'Values from 0 to 6 equivalent to Sunday to Saturday' })
  dayOfWeek: number

  @ValidateNested()
  @Field(() => LessonTime)
  startTime: LessonTime

  @ValidateNested()
  @Field(() => LessonTime)
  endTime: LessonTime
}
