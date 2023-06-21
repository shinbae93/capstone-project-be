import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ClassMethod } from 'src/common/enums'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Course } from './course.entity'
import { Class } from './class.entity'
import { GraphQLDate } from 'graphql-scalars'
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

  @Field()
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
  @Column({ default: false })
  isTeaching: boolean

  @Field()
  @Index()
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, { cascade: ['remove'] })
  user: User

  @Field()
  @Index()
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course, { cascade: ['remove'] })
  course: Course

  @Field()
  @Index()
  @Column()
  classId: string

  @Field(() => Class)
  @ManyToOne(() => Class, { cascade: ['remove'] })
  class: Class

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
