import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PaymentType } from 'src/common/enums'
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from './class.entity'
import { Course } from './course.entity'
import { Enrolment } from './enrolment.entity'
import { User } from './user.entity'

@ObjectType()
@Entity()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  amount: number

  @Field(() => PaymentType)
  @Column()
  type: string

  @Field()
  @Column()
  note: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  enrolmentId: string

  @Field(() => Enrolment, { nullable: true })
  @OneToOne(() => Enrolment)
  enrolment: Enrolment

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  user: User

  @Field()
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course)
  course: Course

  @Field()
  @Column()
  classId: string

  @Field(() => Class)
  @ManyToOne(() => Class)
  class: Class

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
