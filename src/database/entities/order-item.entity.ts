import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class OrderItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Column()
  orderId: string;

  @Field()
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Field(() => ID)
  @Column()
  productId: string;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  actualUnitPrice: number;

  @Field()
  @Column()
  originalUnitPrice: number;
}
