import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTutorReviewInput } from './dto/create-tutor-review.input'
import { UpdateTutorReviewInput } from './dto/update-tutor-review.input'
import { InjectRepository } from '@nestjs/typeorm'
import { TutorReview } from 'src/database/entities/tutor-review.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { TutorReviewQueryParams } from './dto/tutor-review-query-params.input'
import { applySorting } from 'src/utils/query-builder'
import { paginate } from 'nestjs-typeorm-paginate'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'

@Injectable()
export class TutorReviewService {
  constructor(
    @InjectRepository(TutorReview) private tutorReviewRepository: Repository<TutorReview>,
    @InjectRepository(TutorDetail) private tutorDetailRepository: Repository<TutorDetail>,
    @InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>
  ) {}

  async create(input: CreateTutorReviewInput, userId: string) {
    const existedReview = await this.tutorReviewRepository.findOneBy({ tutorId: input.tutorId, authorId: userId })
    if (existedReview) {
      throw new BadRequestException(ERROR_MESSAGE.YOU_ALREADY_REVIEW_THIS_TUTOR)
    }

    const isAlreadyLearn = await this.enrolmentRepository
      .createQueryBuilder()
      .leftJoin('Enrolment.course', 'Course')
      .where(`"Course"."userId" = :tutorId`, { tutorId: input.tutorId })
      .andWhere(`"Course"."isPublished" = TRUE`)
      .andWhere(`"Enrolment"."userId" = :userId`, { userId })
      .getOne()
    if (!isAlreadyLearn) {
      throw new BadRequestException(ERROR_MESSAGE.YOU_HAVE_NOT_BEEN_STUDENT_OF_THIS_TUTOR_BEFORE)
    }

    const tutorReview = this.tutorReviewRepository.create({ ...input, authorId: userId })

    const reviews = await this.tutorReviewRepository.findBy({ tutorId: input.tutorId })

    const rating =
      Math.round(
        ((reviews.reduce((acc, cur) => {
          acc += cur.rating
          return acc
        }, 0) +
          input.rating) /
          (reviews.length + 1)) *
          10
      ) / 10

    await this.tutorDetailRepository.update({ userId: input.tutorId }, { rating })

    return await this.tutorReviewRepository.save(tutorReview)
  }

  findAll(queryParams: TutorReviewQueryParams) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.tutorReviewRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { tutorId } = queryParams.filters

      if (tutorId) {
        queryBuilder.andWhere(`"TutorReview"."tutorId" = :tutorId`, { tutorId })
      }
    }

    queryBuilder.addOrderBy('"TutorReview"."createdAt"', 'DESC', 'NULLS LAST')
    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
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
