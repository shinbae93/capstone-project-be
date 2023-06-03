import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Course } from './course.entity'
import { Class } from './class.entity'
import { EnrolmentStatus } from 'src/common/enums'

@ObjectType()
@Entity()
export class Enrolment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ default: false })
  isFinished: boolean

  @Field(() => EnrolmentStatus)
  status: string

  @Field(() => ID)
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User)
  user: User

  @Field(() => ID)
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course)
  course: Course

  @Field(() => ID)
  @Column()
  classId: string

  @Field(() => Class)
  @ManyToOne(() => Class)
  class: Class
}
