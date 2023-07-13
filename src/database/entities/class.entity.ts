import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLDate } from 'graphql-scalars'
import { ClassMethod } from 'src/common/enums'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Course } from './course.entity'
import { ScheduleTime } from './sub-object/schedule-time'

@ObjectType()
@Entity()
export class Class {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ type: 'float' })
  fee: number

  @Field(() => ClassMethod)
  @Column()
  method: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string

  @Field(() => GraphQLDate)
  @Column({ type: 'date' })
  startDate: Date

  @Field(() => GraphQLDate)
  @Column({ type: 'date' })
  endDate: Date

  @Field(() => Int)
  duration: number

  @Field()
  @Column({ default: 0 })
  totalSlots: number

  @Field({ defaultValue: 0 })
  occupiedSlots: number

  @Field(() => [ScheduleTime])
  @Column({ type: 'jsonb' })
  schedule: ScheduleTime[]

  @Field()
  @Column()
  courseId: string

  @Field(() => Course)
  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
