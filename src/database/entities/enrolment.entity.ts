import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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
  @ManyToOne(() => User, { cascade: ['remove'] })
  user: User

  @Field(() => ID)
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course, { cascade: ['remove'] })
  course: Course

  @Field(() => ID)
  @Column()
  classId: string

  @Field(() => Class)
  @ManyToOne(() => Class, { cascade: ['remove'] })
  class: Class
}
