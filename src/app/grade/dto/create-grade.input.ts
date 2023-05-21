import { InputType, Field } from '@nestjs/graphql'
import { Grade } from 'src/database/entities/grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { EntityExists } from 'src/decorator/entity-exists.decorator'
import { UniqueString } from 'src/decorator/unique-string.decorator'

@InputType()
export class CreateGradeInput {
  @UniqueString(Grade)
  @Field()
  name: string

  @EntityExists(Subject)
  @Field(() => [String], { nullable: true })
  subjectIds: string[]
}
