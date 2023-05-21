import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateTutorRequestInput } from './create-tutor-request.input'
import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'

@InputType()
export class UpdateTutorRequestInput extends PartialType(CreateTutorRequestInput) {
  @EntityExists(TutorRequest)
  @Field(() => ID)
  id: string
}
