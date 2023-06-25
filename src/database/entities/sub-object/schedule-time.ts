import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsIn } from 'class-validator'

@InputType('ScheduleTimeInput')
@ObjectType()
export class ScheduleTime {
  @IsIn([0, 1, 2, 3, 4, 5, 6])
  @Field({ description: 'Values from 0 to 6 equivalent to Sunday to Saturday' })
  dayOfWeek: number

  @Field()
  startTime: string

  @Field()
  endTime: string
}
