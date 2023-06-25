import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { Course } from 'src/database/entities/course.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CalendarQueryParams extends QueryParams {
  @EntityExists(Course)
  @Field(() => ID, { nullable: true })
  courseId: string

  @Field({ nullable: true })
  startTime: Date

  @Field({ nullable: true })
  endTime: Date
}
