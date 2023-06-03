import { Field, InputType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'

@InputType()
export class CreateTutorRequestInput {
  @IsUrl()
  @Field()
  cvImage: string
}
