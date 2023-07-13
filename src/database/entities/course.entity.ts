import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CourseStatus } from 'src/common/enums'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Class } from './class.entity'
import { Grade } from './grade.entity'
import { Subject } from './subject.entity'
import { User } from './user.entity'

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnail: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true, type: 'varchar', array: true })
  objectives: string[]

  @Field()
  @Column({ default: false })
  isPublished: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  publishedAt: Date

  @Field(() => CourseStatus)
  @Column()
  status: string

  @Field()
  @Column()
  userId: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Field()
  @Column()
  gradeId: string

  @ManyToOne(() => Grade, { onDelete: 'CASCADE' })
  grade: Grade

  @Field()
  @Column()
  subjectId: string

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  subject: Subject

  @OneToMany(() => Class, (entity) => entity.course)
  classes: Class[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
