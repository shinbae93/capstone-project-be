import { BadRequestException, Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { CronJob } from 'cron'
import * as moment from 'moment'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'
import { SYSTEM_CHARGE_RATE } from 'src/common/constants'
import { CourseStatus, PaymentType } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Course } from 'src/database/entities/course.entity'
import { Payment } from 'src/database/entities/payment.entity'
import { User } from 'src/database/entities/user.entity'
import { applySorting } from 'src/utils/query-builder'
import { splitTime } from 'src/utils/schedule'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CalendarService } from '../calendar/calendar.service'
import { ClassService } from '../class/class.service'
import { CourseQueryParams } from './dto/courses-query-params.input'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private readonly classService: ClassService,
    private readonly calendarService: CalendarService,
    private schedulerRegistry: SchedulerRegistry
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
    const course = this.courseRepository.create({
      ...input,
      status: CourseStatus.DRAFT,
      userId: currentUser.id,
    })

    return await this.courseRepository.save(course)
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

    const tutor = await this.findOneIfExist({ userId: course.userId })
    if (!tutor) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_IS_ALREADY_PUBLISHED)
    }

    const classes = await this.classService.findMany({ courseId: id })
    if (!classes.length) {
      throw new BadRequestException(ERROR_MESSAGE.COURSE_DOESNT_HAS_ANY_CLASSES)
    }

    // find first study day -> add cron update to inprogress
    // find last study day -> add cron update to ended
    let firstStartClass = classes[0]
    let lastEndClass = classes[0]

    for (const item of classes) {
      if (moment().isSameOrAfter(item.startDate)) {
        throw new BadRequestException(ERROR_MESSAGE.YOU_MUST_PUBLISH_A_COURSE_BEFORE_IT_STARTS)
      }

      if (moment(item.startDate).isBefore(moment(firstStartClass.startDate))) {
        firstStartClass = item
      }
      if (moment(item.endDate).isAfter(moment(lastEndClass.startDate))) {
        lastEndClass = item
      }

      const day = moment(item.startDate)
      while (day.isBefore(item.endDate)) {
        let executionTime: moment.Moment
        executionTime = day
        executionTime.add(1, 'month')

        if (executionTime.isAfter(item.endDate)) {
          executionTime = moment(item.endDate)
        }

        this.addPayoutClassCronJob(
          item.id,
          item.name,
          item.courseId,
          course.name,
          course.userId,
          tutor.name,
          day.toDate(),
          executionTime.toDate()
        )

        day.add(1, 'month')
      }
    }

    const firstClassTime = moment({
      year: moment(firstStartClass.startDate).get('year'),
      month: moment(firstStartClass.startDate).get('month'),
      day: moment(firstStartClass.startDate).get('date'),
      hour: splitTime(firstStartClass.schedule[0].startTime).hour,
      minute: splitTime(firstStartClass.schedule[0].startTime).minute,
    }).toDate()

    this.addUpdateStatusCronJob(id, CourseStatus.IN_PROGRESS, firstClassTime)

    const lastClassTime = moment({
      year: moment(lastEndClass.startDate).get('year'),
      month: moment(lastEndClass.startDate).get('month'),
      day: moment(lastEndClass.startDate).get('date'),
      hour: splitTime(lastEndClass.schedule[0].endTime).hour,
      minute: splitTime(lastEndClass.schedule[0].endTime).minute,
    }).toDate()

    this.addUpdateStatusCronJob(id, CourseStatus.ENDED, lastClassTime)

    this.courseRepository.merge(course, { isPublished: true, status: CourseStatus.UP_COMING, publishedAt: new Date() })

    const listPromises = []
    classes.forEach((item) => listPromises.push(this.calendarService.createManyByClass(course, item, course.userId)))
    await Promise.all(listPromises)

    return this.courseRepository.save(course)
  }

  async remove(id: string) {
    const course = await this.findOneIfExist({ id })
    if (course.isPublished) {
      throw new BadRequestException(ERROR_MESSAGE.CANNOT_DELETE_PUBLISHED_COURSE)
    }

    await this.courseRepository.delete({ id })

    return true
  }

  async addUpdateStatusCronJob(id: string, status: CourseStatus, executionTime: Date) {
    const job = new CronJob(executionTime, async () => {
      const course = await this.courseRepository.findOneBy({ id })
      if (course.isPublished) {
        await this.courseRepository.update({ id }, { status })
      }
    })

    this.schedulerRegistry.addCronJob(`update-status-${status}-course-${id}`, job)
    job.start()
  }

  async addPayoutClassCronJob(
    classId: string,
    className: string,
    courseId: string,
    courseName: string,
    tutorId: string,
    tutorName: string,
    startTime: Date,
    endTime: Date
  ) {
    const job = new CronJob(endTime, async () => {
      const payments = await this.paymentRepository
        .createQueryBuilder()
        .where(`"Payment"."classId" = :classId`, { classId })
        .andWhere(`"Payment"."createdAt" >= :startTime`, { startTime })
        .andWhere(`"Payment"."createdAt" <= :endTime`, { endTime })
        .getMany()

      const totalTutorRevenue = payments.reduce((total, cur) => {
        total += cur.amount
        return total
      }, 0)
      const systemChargeFee = (totalTutorRevenue * SYSTEM_CHARGE_RATE) / 100

      await this.paymentRepository.insert(
        this.paymentRepository.create({
          amount: totalTutorRevenue - systemChargeFee,
          userId: tutorId,
          classId,
          courseId,
          type: PaymentType.PAY_OUT,
          note: `Pay out for tutor ${tutorName}, Course: ${courseName}, Class: ${className}, Duration: ${moment(
            startTime
          ).format('DD/MM/YYYY')} - ${moment(endTime).format('DD/MM/YYYY')}`,
        })
      )

      await this.paymentRepository.insert(
        this.paymentRepository.create({
          amount: systemChargeFee,
          userId: tutorId,
          classId,
          courseId,
          type: PaymentType.PAY_IN,
          note: `Pay in by tutor ${tutorName}, Course: ${courseName}, Class: ${className}, Duration: ${moment(
            startTime
          ).format('DD/MM/YYYY')} - ${moment(endTime).format('DD/MM/YYYY')}`,
        })
      )
    })

    this.schedulerRegistry.addCronJob(
      `payout-tutor-${tutorId}-course-${courseId}-class-${classId}-executionTime-${endTime}`,
      job
    )
    job.start()
  }
}
