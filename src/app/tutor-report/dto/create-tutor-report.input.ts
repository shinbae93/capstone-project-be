import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTutorReportInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
