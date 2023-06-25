import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Course } from './course.entity'
import { Class } from './class.entity'
import { User } from './user.entity'
import { Quiz } from './quiz.entity'

@ObjectType()
@Entity()
export class Assignment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => [String], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  files: string[]

  @Field({ nullable: true })
  @Column({ nullable: true })
  feedback: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  submittedAt: Date

  @Field()
  @Column()
  quizId: string

  @Field(() => Quiz)
  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  quiz: Quiz

  @Field()
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

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
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
