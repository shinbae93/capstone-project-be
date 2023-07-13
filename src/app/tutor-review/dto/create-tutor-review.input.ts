import { Field, Float, InputType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'
import { User } from 'src/database/entities/user.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CreateTutorReviewInput {
  @Field()
  comment: string

  @Min(0)
  @Max(5)
  @Field(() => Float)
  rating: number

  @Field(() => [String], { nullable: true })
  images: string[]

  @EntityExists(User)
  @Field()
  tutorId: string
}
