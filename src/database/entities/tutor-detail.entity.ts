import { Field, Float, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'

@ObjectType()
@Entity()
export class TutorDetail {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  headline: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  biography: string

  @Field()
  @Column()
  cv: string

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @Column({ nullable: true })
  rating: number

  @Field({ nullable: true, defaultValue: 0 })
  totalReviews: number

  @Field(() => ID)
  @Column()
  @Index()
  userId: string

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
