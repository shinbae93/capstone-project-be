import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@InputType('LessonTimeInput')
@ObjectType()
export class LessonTime {
  @Min(0)
  @Max(23)
  @Field({ description: 'Values from 0 to 23' })
  hour: number

  @Min(0)
  @Max(59)
  @Field({ description: 'Values from 0 to 59' })
  minute: number
}
