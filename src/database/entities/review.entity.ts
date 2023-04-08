import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';

@ObjectType()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column()
  rate: number;

  @Field()
  @Column()
  userId: string;

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column()
  orderId: string;

  @Field()
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Field()
  @Column()
  productId: string;

  @Field()
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
