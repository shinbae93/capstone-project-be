import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ChargeInput {
  @Field()
  paymentMethodId: string

  @Field()
  classId: string
}
