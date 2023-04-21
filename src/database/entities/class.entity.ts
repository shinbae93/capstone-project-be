import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Class {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
