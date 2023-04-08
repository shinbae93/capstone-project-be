import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemResolver } from './order-item.resolver';

@Module({
  providers: [OrderItemResolver, OrderItemService]
})
export class OrderItemModule {}
