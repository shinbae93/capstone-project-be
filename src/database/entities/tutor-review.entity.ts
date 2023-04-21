import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TutorReview {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
