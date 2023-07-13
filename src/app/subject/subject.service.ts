import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Subject } from 'src/database/entities/subject.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { SubjectMapGradeService } from '../subject-map-grade/subject-map-grade.service'
import { CreateSubjectInput } from './dto/create-subject.input'
import { UpdateSubjectInput } from './dto/update-subject.input'
import { QueryParams } from 'src/base/types/query-params.type'
import { applySorting } from 'src/utils/query-builder'
import { paginate } from 'nestjs-typeorm-paginate'
import { Course } from 'src/database/entities/course.entity'

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private subjectMapGradeService: SubjectMapGradeService
  ) {}

  findAll(queryParams: QueryParams) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.subjectRepository.createQueryBuilder()

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  findMany(criteria: FindOptionsWhere<Subject> | FindOptionsWhere<Subject>[]) {
    return this.subjectRepository.findBy(criteria)
  }

  async findOne(criteria: FindOptionsWhere<Subject> | FindOptionsWhere<Subject>[]): Promise<Subject> {
    const tutorRequest = await this.subjectRepository.findOneBy(criteria)

    if (!tutorRequest) {
      throw new BadRequestException(ERROR_MESSAGE.SUBJECT_NOT_FOUND)
    }

    return tutorRequest
  }

  async create(input: CreateSubjectInput): Promise<Subject> {
    const { name, gradeIds } = input

    const subject = await this.subjectRepository.save(this.subjectRepository.create({ name }))

    if (gradeIds) {
      await this.subjectMapGradeService.bulkUpdateReferenceForSubject(subject.id, gradeIds)
    }

    return subject
  }

  async update(id: string, input: UpdateSubjectInput): Promise<Subject> {
    const { name, gradeIds } = input

    const subject = await this.subjectRepository.findOneBy({ id })

    this.subjectRepository.merge(subject, { name })

    if (gradeIds) {
      await this.subjectMapGradeService.bulkUpdateReferenceForSubject(subject.id, gradeIds)
    }

    return await this.subjectRepository.save(subject)
  }

  async remove(id: string) {
    const publishedCourse = await this.courseRepository.findOneBy({ subjectId: id })
    if (publishedCourse) {
      throw new BadRequestException(ERROR_MESSAGE.CANNOT_DELETE_SUBJECT_HAVE_PUBLISHED_COURSE)
    }
    await this.findOne({ id })
    await this.subjectRepository.delete({ id })
    await this.subjectMapGradeService.remove({ subjectId: id })

    return true
  }
}
