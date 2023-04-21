import { CreateEnrolmentInput } from './create-enrolment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEnrolmentInput extends PartialType(CreateEnrolmentInput) {
  @Field(() => Int)
  id: number;
}
