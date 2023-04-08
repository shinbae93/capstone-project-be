import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomerService {
  create(createCustomerInput: CreateCustomerInput) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: string) {
    return `This action returns a #${id} customer`;
  }

  update(id: string, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
