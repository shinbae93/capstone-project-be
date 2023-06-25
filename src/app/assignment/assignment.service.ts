import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { paginate } from 'nestjs-typeorm-paginate'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Assignment } from 'src/database/entities/assignment.entity'
import { Quiz } from 'src/database/entities/quiz.entity'
import { applySorting } from 'src/utils/query-builder'
import { FindOptionsWhere, Repository } from 'typeorm'
import { AssignmentFilterParams, AssignmentQueryParams } from './dto/assignment-query-params.input'
import { SubmitAssignmentInput } from './dto/submit-assignment.input'
import { FeedbackAssignmentInput } from './dto/feedback-assignmen.input'

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment) private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>
  ) {}

  findAll(queryParams: AssignmentQueryParams, userId?: string) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.assignmentRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { classId, courseId, quizId } = queryParams.filters

      if (classId) {
        queryBuilder.andWhere(`"Assignment"."classId" = :classId`, { classId })
      }
      if (courseId) {
        queryBuilder.andWhere(`"Assignment"."courseId" = :courseId`, { courseId })
      }
      if (quizId) {
        queryBuilder.andWhere(`"Assignment"."quizId" = :quizId`, { quizId })
      }
    }

    if (userId) {
      queryBuilder.andWhere(`"Assignment"."userId" = :userId`, { userId })
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  findAllWithoutPagination(queryParams: AssignmentFilterParams, userId?: string) {
    const queryBuilder = this.assignmentRepository.createQueryBuilder()

    const { classId, courseId, quizId } = queryParams

    if (classId) {
      queryBuilder.andWhere(`"Assignment"."classId" = :classId`, { classId })
    }
    if (courseId) {
      queryBuilder.andWhere(`"Assignment"."courseId" = :courseId`, { courseId })
    }
    if (quizId) {
      queryBuilder.andWhere(`"Assignment"."quizId" = :quizId`, { quizId })
    }
    if (userId) {
      queryBuilder.andWhere(`"Assignment"."userId" = :userId`, { userId })
    }

    return queryBuilder.getMany()
  }

  findMany(criteria: FindOptionsWhere<Assignment> | FindOptionsWhere<Assignment>[]) {
    return this.assignmentRepository.findBy(criteria)
  }

  async findOne(id: string) {
    const assignment = await this.assignmentRepository.findOneBy({ id })
    if (!assignment) {
      throw new BadRequestException(ERROR_MESSAGE.ASSIGNMENT_NOT_FOUND)
    }

    return assignment
  }

  async bulkCreate(quiz: Quiz, studentIds: string[]) {
    const listAssignments = []
    studentIds.forEach((userId) => {
      listAssignments.push(
        this.assignmentRepository.create({
          classId: quiz.classId,
          courseId: quiz.courseId,
          quizId: quiz.id,
          userId,
        })
      )
    })

    await this.assignmentRepository.insert(listAssignments)
  }

  async submit(id: string, input: SubmitAssignmentInput) {
    const assignment = await this.assignmentRepository.findOneBy({ id })
    if (!assignment) {
      throw new BadRequestException(ERROR_MESSAGE.ASSIGNMENT_NOT_FOUND)
    }

    const quiz = await this.quizRepository.findOneBy({ id: assignment.quizId })
    if (!moment().isBetween(quiz.startTime, quiz.endTime, undefined, '[]')) {
      throw new BadRequestException(ERROR_MESSAGE.NOT_IN_ANSWER_TIME_OF_THIS_QUIZ)
    }

    return this.assignmentRepository.save(
      this.assignmentRepository.merge(assignment, { files: input.files, submittedAt: new Date() })
    )
  }

  async feedback(id: string, input: FeedbackAssignmentInput) {
    const assignment = await this.assignmentRepository.findOneBy({ id })
    if (!assignment) {
      throw new BadRequestException(ERROR_MESSAGE.ASSIGNMENT_NOT_FOUND)
    }

    return this.assignmentRepository.save(this.assignmentRepository.merge(assignment, input))
  }
}
