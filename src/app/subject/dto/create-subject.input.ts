import { InputType, Field } from '@nestjs/graphql'
import { Subject } from 'src/database/entities/subject.entity'
import { UniqueString } from 'src/decorator/unique-string.decorator'

@InputType()
export class CreateSubjectInput {
  @UniqueString(Subject)
  @Field()
  name: string
}
