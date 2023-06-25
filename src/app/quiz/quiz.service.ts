import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateQuizInput } from './dto/create-quiz.input'
import { UpdateQuizInput } from './dto/update-quiz.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Quiz } from 'src/database/entities/quiz.entity'
import { Repository } from 'typeorm'
import { Course } from 'src/database/entities/course.entity'
import { Class } from 'src/database/entities/class.entity'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { QuizQueryParams } from './dto/quiz-query-params.input'
import { applySorting } from 'src/utils/query-builder'
import { paginate } from 'nestjs-typeorm-paginate'
import { AssignmentService } from '../assignment/assignment.service'

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>,
    private readonly assignmentService: AssignmentService
  ) {}

  async create(input: CreateQuizInput) {
    const { classId, courseId } = input

    const course = await this.courseRepository.findOneBy({ id: courseId })
    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }
    if (!course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.THIS_COURSE_IS_NOT_PUBLISHED)
    }

    const classRecord = await this.classRepository.findOneBy({ id: classId })
    if (!classRecord) {
      throw new BadRequestException(ERROR_MESSAGE.CLASS_NOT_FOUND)
    }

    const quiz = await this.quizRepository.save(this.quizRepository.create(input))
    const enrolments = await this.enrolmentRepository.find({ where: { classId }, relations: { user: true } })
    const studentIds = enrolments.map((item) => item.userId)

    await this.assignmentService.bulkCreate(quiz, studentIds)

    return quiz
  }

  findAll(queryParams: QuizQueryParams) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.quizRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { userId, classId, courseId } = queryParams.filters

      if (userId) {
        queryBuilder.andWhere(`"Quiz"."userId" = :userId`, { userId })
      }
      if (classId) {
        queryBuilder.andWhere(`"Quiz"."classId" = :classId`, { classId })
      }
      if (courseId) {
        queryBuilder.andWhere(`"Quiz"."courseId" = :courseId`, { courseId })
      }
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  async findOne(id: string) {
    const quiz = await this.quizRepository.findOneBy({ id })
    if (!quiz) {
      throw new BadRequestException(ERROR_MESSAGE.QUIZ_NOT_FOUND)
    }

    return quiz
  }

  async update(id: string, input: UpdateQuizInput) {
    const quiz = await this.quizRepository.findOneBy({ id })
    if (!quiz) {
      throw new BadRequestException(ERROR_MESSAGE.QUIZ_NOT_FOUND)
    }

    return this.quizRepository.save(this.quizRepository.merge(quiz, input))
  }

  async remove(id: string) {
    await this.quizRepository.delete({ id })
    return true
  }
}
