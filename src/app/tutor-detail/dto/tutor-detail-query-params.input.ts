import { Field, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'

@InputType()
export class TutorDetailFilterParams {
  @Field({ nullable: true })
  name: string
}

@InputType()
export class TutorDetailQueryParams extends QueryParams {
  @Field(() => TutorDetailFilterParams, { nullable: true })
  filters: TutorDetailFilterParams
}
