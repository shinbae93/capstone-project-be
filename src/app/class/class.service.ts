import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'
import { isTwoScheduleTimeArrayOverllaped, timeToHours } from 'src/utils/schedule'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ClassQueryParams } from './dto/class-query-params.input'
import { CreateClassInput } from './dto/create-class.input'
import { UpdateClassInput } from './dto/update-class.input'
import { sortBy } from 'lodash'
import * as moment from 'moment'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ) {}

  async validateClassSchedule(startDate: Date, endDate: Date, userId: string, schedule: ScheduleTime[]) {
    const classes = await this.classRepository
      .createQueryBuilder()
      .where(`"Course"."userId" = :userId`, { userId })
      .andWhere(`"Course"."isPublished" = TRUE`)
      .andWhere(`NOT ("Class"."startDate" > :endDate OR "Class"."endDate" < :startDate)`, {
        startDate,
        endDate,
      })
      .innerJoinAndSelect('Class.course', 'Course', 'Course.id = Class.courseId')
      .getMany()

    for (const record of classes) {
      if (isTwoScheduleTimeArrayOverllaped(schedule, record.schedule)) {
        throw new BadRequestException(ERROR_MESSAGE.OVERLAPPED_SCHEDULE)
      }
    }
  }

  async validateClassName(name: string, id?: string) {
    const queryBuilder = this.classRepository.createQueryBuilder().where(`LOWER("Class"."name") = (:name)`, { name })

    if (id) {
      queryBuilder.andWhere(`"Class"."id" != :id`, { id })
    }

    const duplicatedClassesCount = await queryBuilder.getCount()

    if (duplicatedClassesCount) {
      throw new BadRequestException(ERROR_MESSAGE.NAME_OF_CLASS_IS_ALREADY_EXISTED)
    }
  }

  async create(input: CreateClassInput, userId: string) {
    const course = await this.courseRepository.findOneBy({ id: input.courseId })
    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }
    if (course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.CANNOT_CREATE_CLASS_OF_PUBLISHED_COURSE)
    }

    input.schedule = sortBy(input.schedule, ['dayOfWeek', (item) => timeToHours(item.startTime)])

    if (input.schedule[0].dayOfWeek === 0) {
      const sunday = input.schedule.shift()
      input.schedule = [...input.schedule, sunday]
    }
    if (moment(input.startDate).isSameOrAfter(input.endDate)) {
      throw new BadRequestException(ERROR_MESSAGE.START_DATE_MUST_BE_BEFORE_END_DATE)
    }

    const listDayOfWeek = input.schedule.map((item) => item.dayOfWeek)
    if (!listDayOfWeek.includes(moment(input.startDate).get('day'))) {
      throw new BadRequestException(ERROR_MESSAGE.MISMATCH_IN_SCHEDULE_START_DAY)
    }
    if (!listDayOfWeek.includes(moment(input.endDate).get('day'))) {
      throw new BadRequestException(ERROR_MESSAGE.MISMATCH_IN_SCHEDULE_END_DAY)
    }

    await this.validateClassSchedule(input.startDate, input.endDate, userId, input.schedule)
    await this.validateClassName(input.name)

    const record = this.classRepository.create(input)

    return await this.classRepository.save(record)
  }

  findAll(queryParams: ClassQueryParams) {
    const builder = this.classRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { courseId } = queryParams.filters

      builder.andWhere({ courseId })
    }

    return builder.getMany()
  }

  findMany(criteria: FindOptionsWhere<Class> | FindOptionsWhere<Class>[]) {
    return this.classRepository.findBy(criteria)
  }

  async findOne(criteria: FindOptionsWhere<Class> | FindOptionsWhere<Class>[]) {
    const record = await this.classRepository.findOneBy(criteria)

    if (!record) {
      throw new BadRequestException(ERROR_MESSAGE.CLASS_NOT_FOUND)
    }

    return record
  }

  async update(id: string, input: UpdateClassInput, userId: string) {
    if (input.schedule) {
      input.schedule = sortBy(input.schedule, ['dayOfWeek', (item) => timeToHours(item.startTime)])

      if (moment(input.startDate).isSameOrAfter(input.endDate)) {
        throw new BadRequestException(ERROR_MESSAGE.START_DATE_MUST_BE_BEFORE_END_DATE)
      }
      if (moment(input.startDate).get('day') != input.schedule[0].dayOfWeek) {
        throw new BadRequestException(ERROR_MESSAGE.MISMATCH_IN_SCHEDULE_START_DAY)
      }
      if (moment(input.endDate).get('day') != input.schedule.at(-1).dayOfWeek) {
        throw new BadRequestException(ERROR_MESSAGE.MISMATCH_IN_SCHEDULE_END_DAY)
      }
    }

    const record = await this.classRepository.findOneBy({ id })
    const course = await this.courseRepository.findOneBy({ id: record.courseId })

    if (course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_UPDATE_CLASS_OF_PUBLISHED_COURSE)
    }

    input.name && (await this.validateClassName(input.name, id))
    await this.validateClassSchedule(input.startDate, input.endDate, userId, input.schedule)

    this.classRepository.merge(record, input)

    return this.classRepository.save(record)
  }

  async remove(id: string) {
    const record = await this.findOne({ id })
    const course = await this.courseRepository.findOneBy({ id: record.courseId })

    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }

    if (course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_DELETE_THIS_CLASS)
    }

    await this.classRepository.delete({ id })

    return true
  }
}
