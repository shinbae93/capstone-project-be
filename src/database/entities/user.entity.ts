import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TutorDetail } from './tutor-detail.entity'
import { Role } from './role.entity'

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string

  @Field()
  @Column({ unique: true })
  phoneNumber: string

  @Field()
  @Column()
  gender: number

  @Field()
  @Column()
  birthday: Date

  @Column({ nullable: true })
  refreshToken: string

  @Field()
  @Column()
  roleId: string

  @Field(() => Role)
  @ManyToOne(() => Role)
  role: Role

  @Field()
  @OneToOne(() => TutorDetail)
  tutorDetail: TutorDetail

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
