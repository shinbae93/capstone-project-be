import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateClassInput } from './dto/create-class.input'
import { UpdateClassInput } from './dto/update-class.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Course } from 'src/database/entities/course.entity'
import { CourseStatus } from 'src/common/enums'
import { isTwoScheduleTimeArrayOverllaped } from 'src/util/schedule'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'

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
      .andWhere(`"Course".status = :status`, { status: CourseStatus.PUBLISHED })
      .andWhere(`NOT ("Course"."startDate" > :endDate OR "Course"."endDate" < :startDate)`, {
        startDate: course.startDate,
        endDate: course.endDate,
      })
      .innerJoinAndSelect('Course.classes', 'Class', 'Course.id = Class.courseId')
      .getMany()

    for (const course of courses) {
      for (const record of course.classes) {
        if (isTwoScheduleTimeArrayOverllaped(schedule, record.schedule)) {
          throw new BadRequestException(ERROR_MESSAGE.INVALID_SCHEDULE)
        }
      }
    }
  }

  async create(input: CreateClassInput, userId: string) {
    const course = await this.courseRepository.findOneBy({ id: input.courseId })

    await this.validateClassSchedule(course, userId, input.schedule)

    const record = this.classRepository.create(input)

    return await this.classRepository.save(record)
  }

  findAll() {
    return this.classRepository.find()
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

    if (course.status === CourseStatus.PUBLISHED && input.schedule) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_UPDATE_SCHEDULE_OF_CLASS_OF_PUBLISHED_COURSE)
    }

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

    if (course.status === CourseStatus.PUBLISHED) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_DELETE_THIS_CLASS)
    }

    await this.classRepository.delete({ id })

    return true
  }
}
