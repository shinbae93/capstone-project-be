import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'
import { Grade } from 'src/database/entities/grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { EntityExists } from 'src/decorators/entity-exists.decorator'

@InputType()
export class CreateCourseInput {
  @Field()
  name: string

  @Field()
  fee: number

  @Field({ nullable: true, defaultValue: false })
  isPublished: boolean

  @Field({ nullable: true })
  thumbnail: string

  @Field({ nullable: true })
  description: string

  @Field(() => [String], { nullable: true })
  objectives: string[]

  @Min(1)
  @Max(31)
  @Field(() => Int)
  paymentDate: number

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @EntityExists(Grade)
  @Field(() => ID)
  gradeId: string

  @EntityExists(Subject)
  @Field(() => ID)
  subjectId: string
}
