import { InputType, Field } from '@nestjs/graphql'
import { Grade } from 'src/database/entities/grade.entity'
import { UniqueString } from 'src/decorator/unique-string.decorator'

@InputType()
export class CreateGradeInput {
  @UniqueString(Grade)
  @Field()
  name: string
}
