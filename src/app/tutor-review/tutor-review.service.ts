import { Injectable } from '@nestjs/common'
import { CreateTutorReviewInput } from './dto/create-tutor-review.input'
import { UpdateTutorReviewInput } from './dto/update-tutor-review.input'

@Injectable()
export class TutorReviewService {
  create(createTutorReviewInput: CreateTutorReviewInput) {
    return 'This action adds a new tutorReview'
  }

  findAll() {
    return `This action returns all tutorReview`
  }

  findOne(id: number) {
    return `This action returns a #${id} tutorReview`
  }

  update(id: number, updateTutorReviewInput: UpdateTutorReviewInput) {
    return `This action updates a #${id} tutorReview`
  }

  remove(id: number) {
    return `This action removes a #${id} tutorReview`
  }
}
