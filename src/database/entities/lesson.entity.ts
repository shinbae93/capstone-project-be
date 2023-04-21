import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lesson {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
