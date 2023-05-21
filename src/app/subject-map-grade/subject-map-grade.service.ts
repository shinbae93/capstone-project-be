import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SubjectMapGrade } from 'src/database/entities/subject-map-grade.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { SubjectService } from '../subject/subject.service'
import { GradeService } from '../grade/grade.service'

@Injectable()
export class SubjectMapGradeService {
  constructor(
    @InjectRepository(SubjectMapGrade) private readonly repository: Repository<SubjectMapGrade>,
    private readonly subjectService: SubjectService,
    private readonly gradeService: GradeService
  ) {}

  findAll() {
    return this.repository.find()
  }

  async findOne(
    criteria: FindOptionsWhere<SubjectMapGrade> | FindOptionsWhere<SubjectMapGrade>[]
  ): Promise<SubjectMapGrade> {
    return await this.repository.findOneBy(criteria)
  }

  async create(subjectId: string, gradeId: string): Promise<SubjectMapGrade> {
    await this.subjectService.findOne({ id: subjectId })
    await this.gradeService.findOne({ id: gradeId })

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
