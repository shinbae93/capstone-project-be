import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateGradeInput } from './create-grade.input'
import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { Grade } from 'src/database/entities/grade.entity'

@InputType()
export class UpdateGradeInput extends PartialType(CreateGradeInput) {
  @EntityExists(Grade)
  @Field(() => ID)
  id: string
}
