import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Subject } from 'src/database/entities/subject.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateSubjectInput } from './dto/create-subject.input'
import { UpdateSubjectInput } from './dto/update-subject.input'

@Injectable()
export class SubjectService {
  constructor(@InjectRepository(Subject) private subjectRepository: Repository<Subject>) {}

  findAll() {
    return this.subjectRepository.find()
  }

  async findOne(
    criteria: FindOptionsWhere<Subject> | FindOptionsWhere<Subject>[]
  ): Promise<Subject> {
    const tutorRequest = await this.subjectRepository.findOneBy(criteria)

    if (!tutorRequest) {
      throw new BadRequestException(ERROR_MESSAGE.TUTOR_REQUEST_NOT_FOUND)
    }

    return tutorRequest
  }

  async create(input: CreateSubjectInput): Promise<Subject> {
    const subject = this.subjectRepository.create(input)

    return await this.subjectRepository.save(subject)
  }

  async update(id: string, input: UpdateSubjectInput): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id })

    this.subjectRepository.merge(subject, input)

    return await this.subjectRepository.save(subject)
  }

  async remove(id: string) {
    await this.findOne({ id })
    await this.subjectRepository.delete({ id })

    return true
  }
}
