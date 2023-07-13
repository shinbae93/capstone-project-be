import { Field, InputType, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { Min, ValidateNested } from 'class-validator'
import { ClassMethod } from 'src/common/enums'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'
import { ValidateSchedule } from 'src/decorators/validate-schedule.decorator'

@InputType()
export class CreateClassInput {
  @Field()
  name: string

  @Field(() => ClassMethod)
  method: string

  @Field()
  fee: number

  @Field({ nullable: true })
  address: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Min(1)
  @Field(() => Int)
  totalSlots: number

  @Type(() => ScheduleTime)
  @ValidateNested({ each: true })
  @ValidateSchedule()
  @Field(() => [ScheduleTime])
  schedule: ScheduleTime[]

  @Field()
  courseId: string
}
