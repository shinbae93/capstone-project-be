import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAddressInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
