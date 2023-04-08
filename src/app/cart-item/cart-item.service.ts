import { Injectable } from '@nestjs/common';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';

@Injectable()
export class CartItemService {
  create(createCartItemInput: CreateCartItemInput) {
    return 'This action adds a new cartItem';
  }

  findAll() {
    return `This action returns all cartItem`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: string, updateCartItemInput: UpdateCartItemInput) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} cartItem`;
  }
}
