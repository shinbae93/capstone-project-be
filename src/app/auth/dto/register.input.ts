import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, IsUrl, ValidateIf } from 'class-validator'

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  password: string

  @Field()
  @IsNotEmpty()
  fullName: string

  @ValidateIf((_, value) => value != null)
  @IsUrl()
  @Field({ nullable: true })
  avatar: string

  @Field()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phoneNumber: string

  @Field()
  @IsNotEmpty()
  @IsIn([0, 1, 2])
  gender: number

  @Field()
  @IsNotEmpty()
  @IsDate()
  birthday: Date
}
