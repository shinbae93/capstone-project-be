import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Injectable()
export class BrandService {
  create(createBrandInput: CreateBrandInput) {
    return 'This action adds a new brand';
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: string) {
    return `This action returns a #${id} brand`;
  }

  update(id: string, updateBrandInput: UpdateBrandInput) {
    return `This action updates a #${id} brand`;
  }

  remove(id: string) {
    return `This action removes a #${id} brand`;
  }
}
