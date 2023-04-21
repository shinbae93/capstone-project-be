import { Injectable } from '@nestjs/common';
import { CreateEnrolmentInput } from './dto/create-enrolment.input';
import { UpdateEnrolmentInput } from './dto/update-enrolment.input';

@Injectable()
export class EnrolmentService {
  create(createEnrolmentInput: CreateEnrolmentInput) {
    return 'This action adds a new enrolment';
  }

  findAll() {
    return `This action returns all enrolment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrolment`;
  }

  update(id: number, updateEnrolmentInput: UpdateEnrolmentInput) {
    return `This action updates a #${id} enrolment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrolment`;
  }
}
