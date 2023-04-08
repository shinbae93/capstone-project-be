import { CreateUserAddressInput } from './create-user-address.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAddressInput extends PartialType(
  CreateUserAddressInput,
) {
  @Field(() => Int)
  id: string;
}
