import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class Discount {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  productId: string;

  @Field()
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field({ nullable: true })
  @Column()
  value: number;

  @Field({ nullable: true })
  @Column()
  unit: string;

  @Field()
  @Column()
  startTime: Date;

  @Field()
  @Column()
  endTime: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
