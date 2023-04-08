import { Injectable } from '@nestjs/common';
import { CreateUserAddressInput } from './dto/create-user-address.input';
import { UpdateUserAddressInput } from './dto/update-user-address.input';

@Injectable()
export class UserAddressService {
  create(createUserAddressInput: CreateUserAddressInput) {
    return 'This action adds a new userAddress';
  }

  findAll() {
    return `This action returns all userAddress`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userAddress`;
  }

  update(id: string, updateUserAddressInput: UpdateUserAddressInput) {
    return `This action updates a #${id} userAddress`;
  }

  remove(id: string) {
    return `This action removes a #${id} userAddress`;
  }
}
