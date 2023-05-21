import { User } from 'src/database/entities/user.entity'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class TutorReview {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  comment: string

  @Field(() => [String], { nullable: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  images: string[]

  @Field()
  @Column()
  rating: number

  @Field()
  @Column()
  authorId: string

  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @Field()
  @Column()
  tutorId: string

  @Field(() => User)
  @ManyToOne(() => User)
  tutor: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
