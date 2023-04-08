import { Injectable } from '@nestjs/common';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';

@Injectable()
export class OrderItemService {
  create(createOrderItemInput: CreateOrderItemInput) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: string) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: string, updateOrderItemInput: UpdateOrderItemInput) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} orderItem`;
  }
}
