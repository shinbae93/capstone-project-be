import { CreateTutorDetailInput } from './create-tutor-detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTutorDetailInput extends PartialType(CreateTutorDetailInput) {
  @Field(() => Int)
  id: number;
}
