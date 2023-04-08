import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartItemService } from './cart-item.service';
import { CartItem } from '../../database/entities/cart-item.entity';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}

  @Mutation(() => CartItem)
  createCartItem(
    @Args('createCartItemInput') createCartItemInput: CreateCartItemInput,
  ) {
    return this.cartItemService.create(createCartItemInput);
  }

  @Query(() => [CartItem], { name: 'cartItem' })
  findAll() {
    return this.cartItemService.findAll();
  }

  @Query(() => CartItem, { name: 'cartItem' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.cartItemService.findOne(id);
  }

  @Mutation(() => CartItem)
  updateCartItem(
    @Args('updateCartItemInput') updateCartItemInput: UpdateCartItemInput,
  ) {
    return this.cartItemService.update(
      updateCartItemInput.id,
      updateCartItemInput,
    );
  }

  @Mutation(() => CartItem)
  removeCartItem(@Args('id', { type: () => Int }) id: string) {
    return this.cartItemService.remove(id);
  }
}
