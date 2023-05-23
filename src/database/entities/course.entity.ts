import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { CourseStatus } from 'src/common/enums'
import { Grade } from './grade.entity'
import { Subject } from './subject.entity'
import { Class } from './class.entity'

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ type: 'float' })
  fee: number

  @Field(() => CourseStatus)
  @Column()
  status: string

  @Field()
  @Column({ type: 'date' })
  startDate: Date

  @Field()
  @Column({ type: 'date' })
  endDate: Date

  @Field()
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User)
  user: User

  @Field()
  @Column()
  gradeId: string

  @Field(() => Grade)
  @ManyToOne(() => Grade)
  grade: Grade

  @Field()
  @Column()
  subjectId: string

  @Field(() => Subject)
  @ManyToOne(() => Subject)
  subject: Subject

  @Field(() => [Class])
  @OneToMany(() => Class, (entity) => entity.course)
  classes: Class[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
