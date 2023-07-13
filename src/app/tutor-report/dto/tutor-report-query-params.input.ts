import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { User } from 'src/database/entities/user.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class TutorReportFilterParams {
  @EntityExists(User)
  @Field(() => ID, { nullable: true })
  tutorId: string
}

@InputType()
export class TutorReportQueryParams extends QueryParams {
  @Field(() => TutorReportFilterParams, { nullable: true })
  filters: TutorReportFilterParams
}
