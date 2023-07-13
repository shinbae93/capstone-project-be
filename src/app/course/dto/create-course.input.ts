import { Field, ID, InputType } from '@nestjs/graphql'
import { Grade } from 'src/database/entities/grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CreateCourseInput {
  @Field()
  name: string

  @Field({ nullable: true, defaultValue: false })
  isPublished: boolean

  @Field({ nullable: true })
  thumbnail: string

  @Field({ nullable: true })
  description: string

  @Field(() => [String], { nullable: true })
  objectives: string[]

  @EntityExists(Grade)
  @Field(() => ID)
  gradeId: string

  @EntityExists(Subject)
  @Field(() => ID)
  subjectId: string
}
