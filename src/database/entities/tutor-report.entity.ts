import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { TutorReportStatus } from 'src/common/enums'
import { Course } from './course.entity'
import { Class } from './class.entity'

@ObjectType()
@Entity()
export class TutorReport {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  reason: string

  @Field(() => [String], { nullable: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  files: string[]

  @Field(() => TutorReportStatus)
  @Column()
  status: string

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
  @Column()
  authorId: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  author: User

  @Field()
  @Column()
  tutorId: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  tutor: User

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
