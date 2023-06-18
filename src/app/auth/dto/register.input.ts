import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsEmail, IsPhoneNumber, IsUrl, ValidateIf } from 'class-validator'
import { Gender } from 'src/common/enums'
import { User } from 'src/database/entities/user.entity'
import { Match } from 'src/decorators/match.decorator'
import { Unique } from 'src/decorators/unique.decorator'

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string

  @Field()
  password: string

  @Match('password')
  @Field()
  confirmPassword: string

  @Field()
  fullName: string

  @ValidateIf((_, value) => value != null)
  @IsUrl()
  @Field({ nullable: true })
  avatar: string

  @IsPhoneNumber('VN')
  @Unique(User)
  @Field()
  phoneNumber: string

  @Field(() => Gender)
  gender: number

  @IsDate()
  @Field()
  birthday: Date
}
