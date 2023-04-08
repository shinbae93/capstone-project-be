import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()  
  @Column()
  fullname: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
