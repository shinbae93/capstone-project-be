import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Entity, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity()
export class SubjectMapGrade {
  @Field(() => ID)
  @PrimaryColumn()
  subjectId: string

  @Field(() => ID)
  @PrimaryColumn()
  gradeId: string
}
