import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { applySorting } from 'src/utils/query-builder'
import { FindOptionsWhere, Repository } from 'typeorm'
import { TutorDetailQueryParams } from './dto/tutor-detail-query-params.input'
import { UpdateTutorDetailInput } from './dto/update-tutor-detail.input'
import { TutorReview } from 'src/database/entities/tutor-review.entity'

@Injectable()
export class TutorDetailService {
  constructor(
    @InjectRepository(TutorDetail) private tutorDetailRepository: Repository<TutorDetail>,
    @InjectRepository(TutorReview) private tutorReviewRepository: Repository<TutorReview>
  ) {}

  findAll(queryParams: TutorDetailQueryParams): Promise<Pagination<TutorDetail>> {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.tutorDetailRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { name } = queryParams.filters

      if (name) {
        queryBuilder
          .innerJoin('TutorDetail.user', 'User')
          .andWhere(`unaccent(LOWER("User"."fullName")) ILIKE unaccent(LOWER(:name))`, { name: `%${name}%` })
      }
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  async findOne(criteria: FindOptionsWhere<TutorDetail> | FindOptionsWhere<TutorDetail>[]): Promise<TutorDetail> {
    const tutorDetail = await this.tutorDetailRepository.findOneBy(criteria)

    if (!tutorDetail) {
      throw new BadRequestException(ERROR_MESSAGE.TUTOR_DETAIL_NOT_FOUND)
    }

    return tutorDetail
  }

  async update(id: string, input: UpdateTutorDetailInput) {
    const tutorDetail = await this.tutorDetailRepository.findOneBy({ id })

    this.tutorDetailRepository.merge(tutorDetail, input)

    return await this.tutorDetailRepository.save(tutorDetail)
  }

  async getTotalReviews(tutorId: string) {
    return this.tutorReviewRepository.countBy({ tutorId })
  }
}
