import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { SubjectMapGrade } from 'src/database/entities/subject-map-grade.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class SubjectMapGradeService {
  constructor(
    @InjectRepository(SubjectMapGrade) private readonly repository: Repository<SubjectMapGrade>
  ) {}

  findAll() {
    return this.repository.find()
  }

  async findOne(
    criteria: FindOptionsWhere<SubjectMapGrade> | FindOptionsWhere<SubjectMapGrade>[]
  ): Promise<SubjectMapGrade> {
    const subjectMapGrade = await this.repository.findOneBy(criteria)

    if (!subjectMapGrade) {
      throw new BadRequestException(ERROR_MESSAGE.SUBJECT_MAP_GRADE_NOT_FOUND)
    }

    return subjectMapGrade
  }

  async create(subjectId: string, gradeId: string): Promise<SubjectMapGrade> {
    const subjectMapGrade = await this.repository.findOneBy({ subjectId, gradeId })
    if (subjectMapGrade) {
      throw new BadRequestException(ERROR_MESSAGE.SUBJECT_ALREADY_MAPPED_TO_GRADE)
    }

    return await this.repository.save(this.repository.create({ subjectId, gradeId }))
  }

  async bulkUpdateReferenceForSubject(
    subjectId: string,
    gradeIds: string[]
  ): Promise<SubjectMapGrade[]> {
    await this.remove({ subjectId })

    const listMappers: SubjectMapGrade[] = []

    for (const gradeId of gradeIds) {
      listMappers.push(this.repository.create({ subjectId, gradeId }))
    }

    return this.repository.save(listMappers)
  }

  async bulkUpdateReferenceForGrade(
    gradeId: string,
    subjectIds: string[]
  ): Promise<SubjectMapGrade[]> {
    await this.remove({ gradeId })

    const listMappers: SubjectMapGrade[] = []

    for (const subjectId of subjectIds) {
      listMappers.push(this.repository.create({ subjectId, gradeId }))
    }

    return this.repository.save(listMappers)
  }

  async remove(criteria: FindOptionsWhere<SubjectMapGrade>) {
    await this.repository.delete(criteria)

    return true
  }
}
