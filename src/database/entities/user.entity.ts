import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TutorDetail } from './tutor-detail.entity'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Field()
  @Column()
  fullName: string

  @Field()
  @Column({ unique: true })
  phoneNumber: string

  @Field()
  @Column()
  gender: number

  @Field()
  @Column()
  birthday: Date

  @Field()
  @Column()
  role: string

  @OneToOne(() => TutorDetail)
  tutorDetail: TutorDetail

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
