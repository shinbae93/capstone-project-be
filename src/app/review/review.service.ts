import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';

@Injectable()
export class ReviewService {
  create(createReviewInput: CreateReviewInput) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: string) {
    return `This action returns a #${id} review`;
  }

  update(id: string, updateReviewInput: UpdateReviewInput) {
    return `This action updates a #${id} review`;
  }

  remove(id: string) {
    return `This action removes a #${id} review`;
  }
}
