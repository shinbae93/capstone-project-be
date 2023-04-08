import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemResolver } from './cart-item.resolver';

@Module({
  providers: [CartItemResolver, CartItemService]
})
export class CartItemModule {}
