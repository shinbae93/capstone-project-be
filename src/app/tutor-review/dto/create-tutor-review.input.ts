import { InputType, Field } from '@nestjs/graphql'
import { IsUrl, Max, Min, ValidateIf } from 'class-validator'
import { User } from 'src/database/entities/user.entity'
import { EntityExists } from 'src/decorator/entity-exists.decorator'

@InputType()
export class CreateTutorReviewInput {
  @Field()
  comment: string

  @Min(0)
  @Max(5)
  @Field()
  rating: number

  @ValidateIf((_, value) => value != null)
  @IsUrl(null, { each: true })
  @Field(() => [String], { nullable: true })
  images: string[]

  @EntityExists(User)
  @Field()
  tutorId: string
}
