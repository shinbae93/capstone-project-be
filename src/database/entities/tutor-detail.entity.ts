import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @Field(() => ID)
  @Column()
  @Index()
  userId: string

  @OneToOne(() => User, { cascade: ['remove'] })
  @JoinColumn({ name: 'userId' })
  user: User
}
