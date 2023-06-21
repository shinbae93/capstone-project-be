import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'
import { isTwoScheduleTimeArrayOverllaped } from 'src/utils/schedule'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateClassInput } from './dto/create-class.input'
import { UpdateClassInput } from './dto/update-class.input'
import { ClassQueryParams } from './dto/class-query-params.input'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ) {}

  async validateClassSchedule(course: Course, userId: string, schedule: ScheduleTime[]) {
    const courses = await this.courseRepository
      .createQueryBuilder()
      .where(`"Course"."userId" = :userId`, { userId })
      .andWhere(`"Course"."isPublished" = TRUE`)
      .andWhere(`NOT ("Course"."startDate" > :endDate OR "Course"."endDate" < :startDate)`, {
        startDate: course.startDate,
        endDate: course.endDate,
      })
      .innerJoinAndSelect('Course.classes', 'Class', 'Course.id = Class.courseId')
      .getMany()

    for (const course of courses) {
      for (const record of course.classes) {
        if (isTwoScheduleTimeArrayOverllaped(schedule, record.schedule)) {
          console.log('🚀 ~ file: class.service.ts:33 ~ ClassService ~ validateClassSchedule ~ course:', course)
          console.log(
            '🚀 ~ file: class.service.ts:35 ~ ClassService ~ validateClassSchedule ~ record:',
            JSON.stringify(record, null, 4)
          )
          throw new BadRequestException(ERROR_MESSAGE.INVALID_SCHEDULE)
        }
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

    await this.validateClassSchedule(course, userId, input.schedule)
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
    const record = await this.classRepository.findOneBy({ id })
    const course = await this.courseRepository.findOneBy({ id: record.courseId })

    if (course.isPublished && input.schedule) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_UPDATE_SCHEDULE_OF_CLASS_OF_PUBLISHED_COURSE)
    }

    input.name && (await this.validateClassName(input.name, id))
    await this.validateClassSchedule(course, userId, input.schedule)

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
