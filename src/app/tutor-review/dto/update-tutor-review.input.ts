import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { CreateTutorReviewInput } from './create-tutor-review.input'
import { InputType, Field, PartialType, OmitType, ID } from '@nestjs/graphql'
import { TutorReview } from 'src/database/entities/tutor-review.entity'

@InputType()
export class UpdateTutorReviewInput extends PartialType(
  OmitType(CreateTutorReviewInput, ['tutorId'] as const)
) {
  @EntityExists(TutorReview)
  @Field(() => ID)
  id: string
}
