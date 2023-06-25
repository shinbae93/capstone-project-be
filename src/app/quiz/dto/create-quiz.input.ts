import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateQuizInput {
  @Field()
  title: string

  @Field()
  content: string

  @Field(() => [String], { nullable: true })
  files: string[]

  @Field()
  startTime: Date

  @Field()
  endTime: Date

  @Field(() => ID)
  courseId: string

  @Field(() => ID)
  classId: string
}
