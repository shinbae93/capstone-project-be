import { Field, ID, InputType } from '@nestjs/graphql'
import { TutorRequestStatus } from 'src/common/enums'

@InputType()
export class UpdateStatusTutorRequestInput {
  @Field(() => ID)
  id: string

  @Field(() => TutorRequestStatus)
  status: string
}
