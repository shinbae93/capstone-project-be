import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLessonCommentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
