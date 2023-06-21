import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ScheduleTime } from './sub-object/schedule-time'
import { Course } from './course.entity'
import { ClassMethod } from 'src/common/enums'

@ObjectType()
@Entity()
export class Class {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field(() => ClassMethod)
  @Column()
  method: string

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
