import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.entity'

@ObjectType()
@Entity()
export class TutorDetail {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  cvImage: string

  @Field(() => ID)
  @Column()
  @Index()
  userId: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
