import { Injectable } from '@nestjs/common';
import { CreateTutorDetailInput } from './dto/create-tutor-detail.input';
import { UpdateTutorDetailInput } from './dto/update-tutor-detail.input';

@Injectable()
export class TutorDetailService {
  create(createTutorDetailInput: CreateTutorDetailInput) {
    return 'This action adds a new tutorDetail';
  }

  findAll() {
    return `This action returns all tutorDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutorDetail`;
  }

  update(id: number, updateTutorDetailInput: UpdateTutorDetailInput) {
    return `This action updates a #${id} tutorDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutorDetail`;
  }
}
