import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Course } from 'src/database/entities/course.entity'
import { User } from 'src/database/entities/user.entity'
import { applySorting } from 'src/utils/query-builder'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CourseQueryParams } from './dto/course-query-params.input'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { getCourseStatus } from 'src/utils/course'

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) {}

  findAll(queryParams: CourseQueryParams): Promise<Pagination<Course>> {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.courseRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { statuses, q, gradeIds, subjectIds, userId } = queryParams.filters

      if (q) {
        queryBuilder.andWhere(`unaccent(LOWER("Course"."name")) ILIKE unaccent(LOWER(:name))`, {
          name: `%${q}%`,
        })
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

    this.courseRepository.merge(course, { isPublished: true })

    return this.courseRepository.save(course)
  }

  async remove(id: string) {
    await this.findOneIfExist({ id })
    await this.courseRepository.delete({ id })

    return true
  }
}
