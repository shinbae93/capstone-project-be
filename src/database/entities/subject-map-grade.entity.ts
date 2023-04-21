import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class SubjectMapGrade extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  subjectId: string;

  @Field(() => ID)
  @PrimaryColumn()
  gradeId: string;
}
