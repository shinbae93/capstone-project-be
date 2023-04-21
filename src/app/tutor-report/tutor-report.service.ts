import { Injectable } from '@nestjs/common';
import { CreateTutorReportInput } from './dto/create-tutor-report.input';
import { UpdateTutorReportInput } from './dto/update-tutor-report.input';

@Injectable()
export class TutorReportService {
  create(createTutorReportInput: CreateTutorReportInput) {
    return 'This action adds a new tutorReport';
  }

  findAll() {
    return `This action returns all tutorReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutorReport`;
  }

  update(id: number, updateTutorReportInput: UpdateTutorReportInput) {
    return `This action updates a #${id} tutorReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutorReport`;
  }
}
