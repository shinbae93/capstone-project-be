import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Course } from './course.entity'
import { Class } from './class.entity'

@ObjectType()
@Entity()
export class Enrolment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ default: false })
  isFinished: boolean

  @Field(() => ID)
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Field(() => ID)
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course

  @Field(() => ID)
  @Column()
  classId: string

  @Field(() => Class)
  @ManyToOne(() => Class, { onDelete: 'CASCADE' })
  class: Class

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
