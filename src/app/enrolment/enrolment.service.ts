import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateEnrolmentInput } from './dto/create-enrolment.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'

@Injectable()
export class EnrolmentService {
  constructor(@InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>) {}

  async create(input: CreateEnrolmentInput, userId: string) {
    const enrolment = this.enrolmentRepository.create({ ...input, userId })

    return await this.enrolmentRepository.save(enrolment)
  }

  findAll() {
    return this.enrolmentRepository.find()
  }

  async findOne(criteria: FindOptionsWhere<Enrolment> | FindOptionsWhere<Enrolment>[]): Promise<Enrolment> {
    const enrolment = await this.enrolmentRepository.findOneBy(criteria)

    if (!enrolment) {
      throw new BadRequestException(ERROR_MESSAGE.ENROLMENT_NOT_FOUND)
    }

    return enrolment
  }

  async remove(id: string) {
    await this.findOne({ id })
    await this.enrolmentRepository.delete({ id })

    return true
  }
}
