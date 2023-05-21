import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { EntityExists } from 'src/decorator/entity-exists.decorator'

@InputType()
export class UpdateTutorDetailInput {
  @EntityExists(TutorDetail)
  @Field(() => ID)
  id: string

  @IsUrl()
  @Field()
  cvImage: string
}
