import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Grade } from 'src/database/entities/grade.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { SubjectMapGradeService } from '../subject-map-grade/subject-map-grade.service'
import { CreateGradeInput } from './dto/create-grade.input'
import { UpdateGradeInput } from './dto/update-grade.input'

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
    private subjectMapGradeService: SubjectMapGradeService
  ) {}

  findAll() {
    return this.gradeRepository.find()
  }

  findMany(criteria: FindOptionsWhere<Grade> | FindOptionsWhere<Grade>[]) {
    return this.gradeRepository.findBy(criteria)
  }

  async findOne(criteria: FindOptionsWhere<Grade> | FindOptionsWhere<Grade>[]): Promise<Grade> {
    const grade = await this.gradeRepository.findOneBy(criteria)

    if (!grade) {
      throw new BadRequestException(ERROR_MESSAGE.GRADE_NOT_FOUND)
    }

    return grade
  }

  async create(input: CreateGradeInput): Promise<Grade> {
    const { name, subjectIds } = input

    const grade = await this.gradeRepository.save(this.gradeRepository.create({ name }))

    if (subjectIds) {
      await this.subjectMapGradeService.bulkUpdateReferenceForGrade(grade.id, subjectIds)
    }

    return grade
  }

  async update(id: string, input: UpdateGradeInput): Promise<Grade> {
    const { name, subjectIds } = input

    const grade = await this.gradeRepository.findOneBy({ id })

    this.gradeRepository.merge(grade, { name })

    if (subjectIds) {
      await this.subjectMapGradeService.bulkUpdateReferenceForGrade(grade.id, subjectIds)
    }

    return await this.gradeRepository.save(grade)
  }

  async remove(id: string) {
    await this.findOne({ id })
    await this.gradeRepository.delete({ id })
    await this.subjectMapGradeService.remove({ gradeId: id })

    return true
  }
}
