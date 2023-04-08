import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class CartItem {
  @Field(() => ID)
  @PrimaryColumn()
  userId: string;

  @Field(() => ID)
  @PrimaryColumn()
  productId: string;

  @Field()
  @Column()
  quantity: number;
}
