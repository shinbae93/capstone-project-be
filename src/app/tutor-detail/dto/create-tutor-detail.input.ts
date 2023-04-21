import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTutorDetailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
