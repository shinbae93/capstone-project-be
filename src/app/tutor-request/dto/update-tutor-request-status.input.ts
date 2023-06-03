import { Field, ID, InputType } from '@nestjs/graphql'
import { TutorRequestStatus } from 'src/common/enums'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class UpdateTutorRequestStatusInput {
  @EntityExists(TutorRequest)
  @Field(() => ID)
  id: string

  @Field(() => TutorRequestStatus)
  status: string
}
