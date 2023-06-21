import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Course } from 'src/database/entities/course.entity'
import { User } from 'src/database/entities/user.entity'
import { getCourseStatus } from 'src/utils/course'
import { applySorting } from 'src/utils/query-builder'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CalendarService } from '../calendar/calendar.service'
import { ClassService } from '../class/class.service'
import { CreateCourseInput } from './dto/create-course.input'
import { CourseQueryParams } from './dto/get-courses.input'
import { UpdateCourseInput } from './dto/update-course.input'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private readonly classService: ClassService,
    private readonly calendarService: CalendarService
  ) {}

  findAll(queryParams: CourseQueryParams): Promise<Pagination<Course>> {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.courseRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { statuses, q, gradeIds, subjectIds, userId, isPublished } = queryParams.filters

      if (q) {
        queryBuilder.andWhere(`unaccent(LOWER("Course"."name")) ILIKE unaccent(LOWER(:name))`, {
          name: `%${q}%`,
        })
      }
      if (isPublished != null) {
        queryBuilder.andWhere(`"Course"."isPublished" = :isPublished`, { isPublished })
      }
      if (gradeIds) {
        queryBuilder.andWhere(`"Course"."gradeId" = ANY(ARRAY[:...gradeIds]::uuid[])`, { gradeIds })
      }
      if (subjectIds) {
        queryBuilder.andWhere(`"Course"."subjectId" = ANY(ARRAY[:...subjectIds]::uuid[])`, { subjectIds })
      }
      if (statuses) {
        queryBuilder.andWhere(`"Course"."status" = ANY(ARRAY[:...statuses])`, { statuses })
      }
      if (userId) {
        queryBuilder.andWhere(`"Course"."userId" = :userId`, { userId })
      }
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  findOne(criteria: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]): Promise<Course> {
    return this.courseRepository.findOneBy(criteria)
  }

  async findOneIfExist(criteria: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]): Promise<Course> {
    const course = await this.findOne(criteria)

    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }

    return course
  }

  async create(input: CreateCourseInput, currentUser: User): Promise<Course> {
    const status = getCourseStatus(input.startDate, input.endDate)

    const request = this.courseRepository.create({
      ...input,
      status,
      userId: currentUser.id,
    })

    return await this.courseRepository.save(request)
  }

  async update(id: string, input: UpdateCourseInput): Promise<Course> {
    const course = await this.findOneIfExist({ id })

    if (course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_UPDATE_PUBLISHED_COURSE)
    }

    this.courseRepository.merge(course, input)

    return await this.courseRepository.save(course)
  }

  async publish(id: string) {
    const course = await this.findOneIfExist({ id })
    if (course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_IS_ALREADY_PUBLISHED)
    }

    const classes = await this.classService.findMany({ courseId: id })
    if (!classes.length) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_DOESNT_HAS_ANY_CLASSES)
    }

    this.courseRepository.merge(course, { isPublished: true })

    const listPromises = []
    classes.forEach((item) => listPromises.push(this.calendarService.createManyByClass(course, item, course.userId)))
    await Promise.all(listPromises)

    return this.courseRepository.save(course)
  }

  async remove(id: string) {
    await this.findOneIfExist({ id })
    await this.courseRepository.delete({ id })

    return true
  }
}
