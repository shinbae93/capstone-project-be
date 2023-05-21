import { InputType, Field } from '@nestjs/graphql'
import { Grade } from 'src/database/entities/grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { UniqueString } from 'src/decorator/unique-string.decorator'

@InputType()
export class CreateSubjectInput {
  @UniqueString(Subject)
  @Field()
  name: string

  @EntityExists(Grade)
  @Field(() => [String], { nullable: true })
  gradeIds: string[]
}
