import { Field, ID, ObjectType } from '@nestjs/graphql'
import { TutorRequestStatus } from 'src/common/enums'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'

@ObjectType()
@Entity()
export class TutorRequest {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  cvImage: string

  @Field(() => TutorRequestStatus)
  @Column()
  status: string

  @Field()
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User)
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
