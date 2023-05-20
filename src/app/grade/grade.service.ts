import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateGradeInput } from './dto/create-grade.input'
import { UpdateGradeInput } from './dto/update-grade.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Grade } from 'src/database/entities/grade.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'

@Injectable()
export class GradeService {
  constructor(@InjectRepository(Grade) private gradeRepository: Repository<Grade>) {}

  findAll() {
    return this.gradeRepository.find()
  }

  async findOne(criteria: FindOptionsWhere<Grade> | FindOptionsWhere<Grade>[]): Promise<Grade> {
    const grade = await this.gradeRepository.findOneBy(criteria)

    if (!grade) {
      throw new BadRequestException(ERROR_MESSAGE)
    }

    return grade
  }

  async create(input: CreateGradeInput): Promise<Grade> {
    const grade = this.gradeRepository.create(input)

    return await this.gradeRepository.save(grade)
  }

  async update(id: string, input: UpdateGradeInput): Promise<Grade> {
    const tutorRequest = await this.gradeRepository.findOneBy({ id })

    this.gradeRepository.merge(tutorRequest, input)

    return await this.gradeRepository.save(tutorRequest)
  }

  async remove(id: string) {
    await this.findOne({ id })
    await this.gradeRepository.delete({ id })

    return true
  }
}
