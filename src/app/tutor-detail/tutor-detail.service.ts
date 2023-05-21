import { BadRequestException, Injectable } from '@nestjs/common'
import { UpdateTutorDetailInput } from './dto/update-tutor-detail.input'
import { FindOptionsWhere, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { ERROR_MESSAGE } from 'src/common/error-message'

@Injectable()
export class TutorDetailService {
  constructor(
    @InjectRepository(TutorDetail) private tutorDetailRepository: Repository<TutorDetail>
  ) {}

  async findOne(
    criteria: FindOptionsWhere<TutorDetail> | FindOptionsWhere<TutorDetail>[]
  ): Promise<TutorDetail> {
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
}
