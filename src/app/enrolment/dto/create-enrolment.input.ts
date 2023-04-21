import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEnrolmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
