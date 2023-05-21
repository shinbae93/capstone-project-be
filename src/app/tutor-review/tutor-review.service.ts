import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTutorReviewInput } from './dto/create-tutor-review.input'
import { UpdateTutorReviewInput } from './dto/update-tutor-review.input'
import { InjectRepository } from '@nestjs/typeorm'
import { TutorReview } from 'src/database/entities/tutor-review.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'

@Injectable()
export class TutorReviewService {
  constructor(
    @InjectRepository(TutorReview) private tutorReviewRepository: Repository<TutorReview>
  ) {}

  async create(input: CreateTutorReviewInput, userId: string) {
    const tutorReview = this.tutorReviewRepository.create({ ...input, authorId: userId })
    return await this.tutorReviewRepository.save(tutorReview)
  }

  findAll() {
    return this.tutorReviewRepository.find()
  }

  async findOne(criteria: FindOptionsWhere<TutorReview> | FindOptionsWhere<TutorReview>[]) {
    const tutorReview = await this.tutorReviewRepository.findOneBy(criteria)

    if (!tutorReview) {
      throw new BadRequestException(ERROR_MESSAGE.TUTOR_REVIEW_NOT_FOUND)
    }

    return tutorReview
  }

  async update(id: string, input: UpdateTutorReviewInput) {
    const tutorReview = await this.tutorReviewRepository.findOneBy({ id })

    this.tutorReviewRepository.merge(tutorReview, input)

    return await this.tutorReviewRepository.save(tutorReview)
  }

  async remove(id: string) {
    await this.tutorReviewRepository.delete({ id })

    return true
  }
}
