import { Field, ID, ObjectType } from '@nestjs/graphql'
import { GraphQLDate } from 'graphql-scalars'
import { ClassMethod, CourseStatus } from 'src/common/enums'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Class } from './class.entity'
import { Course } from './course.entity'
import { User } from './user.entity'

@ObjectType()
@Entity()
export class Calendar {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  courseName: string

  @Field()
  @Column()
  className: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  tutorName: string

  @Field(() => CourseStatus)
  @Column()
  status: string

  @Field(() => ClassMethod)
  @Column()
  method: string

  @Field(() => GraphQLDate)
  @Column({ type: 'date' })
  date: Date

  @Field()
  @Column()
  startTime: string

  @Field()
  @Column()
  endTime: string

  @Field()
  @Index()
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Field({ nullable: true })
  @Column({ nullable: true })
  tutorId: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  tutor: User

  @Field()
  @Index()
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course

  @Field()
  @Index()
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
