import { CreateTutorReviewInput } from './create-tutor-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTutorReviewInput extends PartialType(CreateTutorReviewInput) {
  @Field(() => Int)
  id: number;
}
