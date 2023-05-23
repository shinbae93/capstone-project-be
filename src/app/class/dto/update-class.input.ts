import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreateClassInput } from './create-class.input'
import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { Class } from 'src/database/entities/class.entity'

@InputType()
export class UpdateClassInput extends PartialType(
  OmitType(CreateClassInput, ['courseId'] as const)
) {
  @EntityExists(Class)
  @Field(() => ID)
  id: string
}
