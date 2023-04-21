import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTutorReviewInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
