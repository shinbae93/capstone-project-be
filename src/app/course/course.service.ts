import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/database/entities/course.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { User } from 'src/database/entities/user.entity'
import { CourseStatus } from 'src/common/enums'

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) {}

  findAll() {
    return this.courseRepository.find()
  }

  async findOne(criteria: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]): Promise<Course> {
    return await this.courseRepository.findOneBy(criteria)
  }

  async findOneIfExist(
    criteria: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]
  ): Promise<Course> {
    const course = await this.findOne(criteria)

    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }

    return course
  }

  async create(input: CreateCourseInput, currentUser: User): Promise<Course> {
    const request = this.courseRepository.create({
      ...input,
      userId: currentUser.id,
    })

    return await this.courseRepository.save(request)
  }

  async update(id: string, input: UpdateCourseInput): Promise<Course> {
    const course = await this.findOneIfExist({ id })

    if (course.status === CourseStatus.PUBLISH) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_UPDATE_PUBLISHED_COURSE)
    }

    this.courseRepository.merge(course, input)

    return await this.courseRepository.save(course)
  }

  async remove(id: string) {
    await this.findOneIfExist({ id })
    await this.courseRepository.delete({ id })

    return true
  }
}
