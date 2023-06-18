import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { CourseStatus } from 'src/common/enums'
import { Grade } from 'src/database/entities/grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { User } from 'src/database/entities/user.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CourseFilterParams {
  @Field(() => [CourseStatus], { nullable: true })
  statuses: string[]

  @EntityExists(Grade)
  @Field(() => [ID], { nullable: true })
  gradeIds: string[]

  @EntityExists(Subject)
  @Field(() => [ID], { nullable: true })
  subjectIds: string[]

  @EntityExists(User)
  @Field(() => ID, { nullable: true })
  userId: string

  @Field({ nullable: true })
  q: string
}

@InputType()
export class CourseQueryParams extends QueryParams {
  @Field(() => CourseFilterParams, { nullable: true })
  filters: CourseFilterParams
}
