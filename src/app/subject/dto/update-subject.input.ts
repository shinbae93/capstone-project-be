import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateSubjectInput } from './create-subject.input'
import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { Subject } from 'src/database/entities/subject.entity'

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {
  @EntityExists(Subject)
  @Field(() => ID)
  id: string
}
