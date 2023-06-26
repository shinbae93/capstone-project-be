import { Field, ID, InputType } from '@nestjs/graphql'
import { QueryParams } from 'src/base/types/query-params.type'
import { Gender } from 'src/common/enums'

@InputType()
export class UserFilterParams {
  @Field(() => [ID], { nullable: true })
  roleIds: string[]

  @Field({ nullable: true })
  fullName: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  phoneNumber: string

  @Field(() => Gender, { nullable: true })
  gender: number
}

@InputType()
export class UserQueryParams extends QueryParams {
  @Field(() => UserFilterParams, { nullable: true })
  filters: UserFilterParams
}
