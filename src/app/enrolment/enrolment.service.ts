import { BadRequestException, Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { CronJob } from 'cron'
import { GraphQLResolveInfo } from 'graphql'
import * as moment from 'moment'
import { paginate } from 'nestjs-typeorm-paginate'
import { EnrolmentStatus } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { User } from 'src/database/entities/user.entity'
import { hasSelectedField } from 'src/utils/graphql'
import { applySorting } from 'src/utils/query-builder'
import { FindOptionsWhere, Not, Repository } from 'typeorm'
import { CalendarService } from '../calendar/calendar.service'
import { UserService } from '../user/user.service'
import { CreateEnrolmentInput } from './dto/create-enrolment.input'
import { EnrolmentQueryParams } from './dto/enrolment-query-params.input'
import { sortBy } from 'lodash'

@Injectable()
export class EnrolmentService {
  constructor(
    @InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private readonly calendarService: CalendarService,
    private readonly userService: UserService,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  getCountByClass(classId: string) {
    return this.enrolmentRepository.countBy({ classId, status: Not(EnrolmentStatus.OVERDUE_PAYMENT) })
  }

  async create(input: CreateEnrolmentInput, userId: string) {
    const classEntity = await this.classRepository.findOneBy({ id: input.classId })
    if (!classEntity) {
      throw new BadRequestException(ERROR_MESSAGE.CLASS_NOT_FOUND)
    }

    const occupiedSlots = await this.enrolmentRepository.countBy({
      classId: input.classId,
      status: Not(EnrolmentStatus.OVERDUE_PAYMENT),
    })

    if (occupiedSlots + 1 >= classEntity.totalSlots) {
      throw new BadRequestException(ERROR_MESSAGE.THIS_CLASS_IS_FULL)
    }

    const course = await this.courseRepository.findOneBy({ id: classEntity.courseId })
    if (!course) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_NOT_FOUND)
    }

    const existedEnrolment = await this.enrolmentRepository.findOneBy({
      courseId: classEntity.courseId,
      userId,
      status: Not(EnrolmentStatus.OVERDUE_PAYMENT),
    })
    if (existedEnrolment) {
      throw new BadRequestException(ERROR_MESSAGE.YOU_ALREADY_ENROLLED)
    }

    if (moment().startOf('day').isAfter(moment(classEntity.endDate))) {
      throw new BadRequestException(ERROR_MESSAGE.CLASS_IS_ALREADY_FINISHED)
    }

    /**
     * get total months enrolled from input
     * get start date
     * add month from input (validate if after end date) = end date
     */

    const now = moment()
    const momentStart = moment(classEntity.startDate)

    const start = now.isAfter(classEntity.startDate) ? now : momentStart
    const startTime = start.toDate()

    const remainingDuration = Math.ceil(moment(classEntity.endDate).diff(start, 'month', true))
    if (remainingDuration < input.totalMonths) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_TOTAL_MONTHS)
    }
    const end = start.add(input.totalMonths, 'months')
    const endTime = end.isAfter(classEntity.endDate) ? classEntity.endDate : end.toDate()

    const enrolment = await this.enrolmentRepository.save(
      this.enrolmentRepository.create({
        ...input,
        startTime,
        endTime,
        courseId: classEntity.courseId,
        userId,
        status: EnrolmentStatus.PENDING_PAYMENT,
        overduePaymentAt: moment().add(15, 'minutes').toDate(),
      })
    )

    this.addOverduePaymentCronJob(enrolment.id, enrolment.overduePaymentAt)
    const tutor = await this.userService.findOne({ id: course.userId })
    await this.calendarService.createManyByClass(course, classEntity, userId, tutor)

    return enrolment
  }

  findAll(queryParams: EnrolmentQueryParams, info: GraphQLResolveInfo, currentUser?: User) {
    const { sorting, pagination, filters } = queryParams

    const queryBuilder = this.enrolmentRepository.createQueryBuilder()

    if (hasSelectedField(info, ['items', 'course'])) {
      queryBuilder.innerJoinAndSelect('Enrolment.course', 'Course', 'Enrolment.courseId = Course.id')

      if (filters?.statuses) {
        const { statuses } = filters

        queryBuilder.andWhere(`"Enrolment"."status" = ANY(ARRAY[:...statuses])`, { statuses })
      }
    }

    if (filters?.courseId) {
      queryBuilder.andWhere(`"Enrolment"."courseId" = :courseId`, { courseId: filters.courseId })
    }

    if (currentUser) {
      queryBuilder.andWhere(`"Enrolment"."userId" = :userId`, { userId: currentUser.id })
    }
    queryBuilder.addOrderBy(`"Enrolment"."createdAt"`, 'DESC', 'NULLS LAST')

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

  async getMyLatestEnrolment(criteria: FindOptionsWhere<Enrolment> | FindOptionsWhere<Enrolment>[]) {
    const enrolments = await this.enrolmentRepository.findBy(criteria)
    const enrolment = sortBy(enrolments, 'createdAt').at(-1)

    return enrolment
  }

  async isEnrolled(courseId: string, userId: string) {
    const res = await this.enrolmentRepository.findOneBy({
      courseId,
      userId,
      status: Not(EnrolmentStatus.OVERDUE_PAYMENT),
    })
    return !!res
  }

  async remove(id: string) {
    await this.findOne({ id })
    await this.enrolmentRepository.delete({ id })

    return true
  }

  async addOverduePaymentCronJob(id: string, overduePaymentAt: Date) {
    const job = new CronJob(overduePaymentAt, async () => {
      const enrolment = await this.enrolmentRepository.findOneBy({ id })
      if (!enrolment?.paymentId) {
        await this.enrolmentRepository.update({ id }, { status: EnrolmentStatus.OVERDUE_PAYMENT })
      }
    })
    this.schedulerRegistry.addCronJob(`update-overduepayment-enrolment-${id}`, job)
    job.start()
  }
}
