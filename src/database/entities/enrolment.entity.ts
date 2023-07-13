import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EnrolmentStatus } from 'src/common/enums'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from './class.entity'
import { Course } from './course.entity'
import { Payment } from './payment.entity'
import { User } from './user.entity'
import { GraphQLDate } from 'graphql-scalars'

@ObjectType()
@Entity()
export class Enrolment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => EnrolmentStatus)
  @Column()
  status: string

  @Field(() => GraphQLDate)
  @Column({ type: 'timestamp without time zone' })
  startTime: Date

  @Field(() => GraphQLDate)
  @Column({ type: 'timestamp without time zone' })
  endTime: Date

  @Field(() => GraphQLDate)
  @Column({ type: 'timestamp without time zone' })
  overduePaymentAt: Date

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

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  paymentId: string

  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
