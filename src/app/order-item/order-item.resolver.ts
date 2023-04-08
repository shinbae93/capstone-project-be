import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderItemService } from './order-item.service';
import { OrderItem } from '../../database/entities/order-item.entity';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Mutation(() => OrderItem)
  createOrderItem(
    @Args('createOrderItemInput') createOrderItemInput: CreateOrderItemInput,
  ) {
    return this.orderItemService.create(createOrderItemInput);
  }

  @Query(() => [OrderItem], { name: 'orderItem' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Query(() => OrderItem, { name: 'orderItem' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.orderItemService.findOne(id);
  }

  @Mutation(() => OrderItem)
  updateOrderItem(
    @Args('updateOrderItemInput') updateOrderItemInput: UpdateOrderItemInput,
  ) {
    return this.orderItemService.update(
      updateOrderItemInput.id,
      updateOrderItemInput,
    );
  }

  @Mutation(() => OrderItem)
  removeOrderItem(@Args('id', { type: () => Int }) id: string) {
    return this.orderItemService.remove(id);
  }
}
