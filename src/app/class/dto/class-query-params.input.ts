import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { Course } from 'src/database/entities/course.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class ClassFilterParams {
  @EntityExists(Course)
  @Field(() => ID, { nullable: true })
  courseId: string

  @Field({ nullable: true })
  q: string
}

@InputType()
export class ClassQueryParams extends QueryParams {
  @Field(() => ClassFilterParams, { nullable: true })
  filters: ClassFilterParams
}
