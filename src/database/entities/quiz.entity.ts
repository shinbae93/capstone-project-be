import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Assignment } from './assignment.entity'
import { Class } from './class.entity'
import { Course } from './course.entity'

@ObjectType()
@Entity()
export class Quiz {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  content: string

  @Field(() => [String], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  files: string[]

  @Field()
  @Column()
  startTime: Date

  @Field()
  @Column()
  endTime: Date

  @OneToMany(() => Assignment, (entity) => entity.quiz)
  assignments: Assignment[]

  @Field()
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course

  @Field()
  @Column()
  classId: string

  @Field(() => Class)
  @ManyToOne(() => Class, { onDelete: 'CASCADE' })
  class: Class

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
