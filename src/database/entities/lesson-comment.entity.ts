import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LessonComment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
