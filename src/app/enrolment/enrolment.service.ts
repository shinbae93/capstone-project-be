import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GraphQLResolveInfo } from 'graphql'
import { paginate } from 'nestjs-typeorm-paginate'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { hasSelectedField } from 'src/utils/graphql'
import { applySorting } from 'src/utils/query-builder'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CalendarService } from '../calendar/calendar.service'
import { UserService } from '../user/user.service'
import { CreateEnrolmentInput } from './dto/create-enrolment.input'
import { EnrolmentQueryParams } from './dto/enrolment-query-params.input'
import { User } from 'src/database/entities/user.entity'

@Injectable()
export class EnrolmentService {
  constructor(
    @InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private readonly calendarService: CalendarService,
    private readonly userService: UserService
  ) {}

  getCountByClass(classId: string) {
    return this.enrolmentRepository.countBy({ classId })
  }

  async create(input: CreateEnrolmentInput, userId: string) {
    const classEntity = await this.classRepository.findOneBy({ id: input.classId })
    if (!classEntity) {
      throw new BadRequestException(ERROR_MESSAGE.CLASS_NOT_FOUND)
    }

    const course = await this.courseRepository.findOneBy({ id: classEntity.courseId })
    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }

    const existedEnrolment = await this.enrolmentRepository.findOneBy({ courseId: classEntity.courseId })
    if (existedEnrolment) {
      throw new BadRequestException(ERROR_MESSAGE.YOU_ALREADY_ENROLLED)
    }

    const enrolment = this.enrolmentRepository.create({ ...input, courseId: classEntity.courseId, userId })
    const tutor = await this.userService.findOne({ id: course.userId })
    await this.calendarService.createManyByClass(course, classEntity, userId, tutor)

    return this.enrolmentRepository.save(enrolment)
  }

  findAll(queryParams: EnrolmentQueryParams, info: GraphQLResolveInfo, currentUser?: User) {
    const { sorting, pagination, filters } = queryParams

    const queryBuilder = this.enrolmentRepository.createQueryBuilder()

    if (hasSelectedField(info, ['items', 'course'])) {
      queryBuilder.innerJoinAndSelect('Enrolment.course', 'Course', 'Enrolment.courseId = Course.id')

      if (filters?.statuses) {
        const { statuses } = filters

        queryBuilder.andWhere(`"Course"."status" = ANY(ARRAY[:...statuses])`, { statuses })
      }
    }

    if (filters?.courseId) {
      queryBuilder.andWhere(`"Enrolment"."courseId" = :courseId`, { courseId: filters.courseId })
    }

    if (currentUser) {
      queryBuilder.andWhere(`"Enrolment"."userId" = :userId`, { userId: currentUser.id })
    }
    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  async findOne(criteria: FindOptionsWhere<Enrolment> | FindOptionsWhere<Enrolment>[]): Promise<Enrolment> {
    const enrolment = await this.enrolmentRepository.findOneBy(criteria)

    if (!enrolment) {
      throw new BadRequestException(ERROR_MESSAGE.ENROLMENT_NOT_FOUND)
    }

    return enrolment
  }

  async isEnrolled(courseId: string, userId: string) {
    const res = await this.enrolmentRepository.findOneBy({ courseId, userId })
    return !!res
  }

  async remove(id: string) {
    await this.findOne({ id })
    await this.enrolmentRepository.delete({ id })

    return true
  }
}
