import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { paginate } from 'nestjs-typeorm-paginate'
import { PaymentType } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Class } from 'src/database/entities/class.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { Payment } from 'src/database/entities/payment.entity'
import { User } from 'src/database/entities/user.entity'
import { applySorting } from 'src/utils/query-builder'
import { getEnrolmentStatus } from 'src/utils/status'
import { EntityManager, Repository } from 'typeorm'
import { StripeService } from '../stripe/stripe.service'
import { ChargeInput } from './dto/charge.input'
import { PaymentQueryParams } from './dto/payment-query-params.input'
import { sortBy } from 'lodash'

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Class) private readonly classRepository: Repository<Class>,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  findAll(queryParams: PaymentQueryParams) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.paymentRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { classId, courseId, userId, isAdmin } = queryParams.filters

      if (classId) {
        queryBuilder.andWhere(`"Payment"."classId" = :classId`, { classId })
      }
      if (courseId) {
        queryBuilder.andWhere(`"Payment"."courseId" = :courseId`, { courseId })
      }
      if (userId) {
        queryBuilder.andWhere(`"Payment"."userId" = :userId`, { userId })
      }
      if (isAdmin) {
        queryBuilder
          .andWhere(`"Payment"."type" = :type`, { type: PaymentType.PAY_IN })
          .andWhere(`"Payment"."enrolmentId" IS NULL`)
      }
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  async findOne(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id })
    if (!payment) {
      throw new BadRequestException(ERROR_MESSAGE.PAYMENT_NOT_FOUND)
    }

    return payment
  }

  async charge(input: ChargeInput, currentUser: User) {
    const classRecord = await this.classRepository.findOneBy({ id: input.classId })
    if (!classRecord) {
      throw new BadRequestException(ERROR_MESSAGE.CLASS_NOT_FOUND)
    }

    return this.entityManager.transaction(async (trx) => {
      const enrolments = await trx.getRepository(Enrolment).findBy({ classId: input.classId, userId: currentUser.id })
      const enrolment = sortBy(enrolments, 'createdAt').at(-1)
      if (moment().isSameOrAfter(enrolment.overduePaymentAt)) {
        throw new BadRequestException(ERROR_MESSAGE.OVERDUE_FOR_PAYMENT)
      }

      const classRecord = await trx.getRepository(Class).findOneBy({ id: input.classId })
      if (!classRecord) {
        throw new BadRequestException(ERROR_MESSAGE.CLASS_NOT_FOUND)
      }

      const amount = classRecord.fee * moment(enrolment.endTime).diff(enrolment.startTime, 'month', true)

      let stripeCustomerId = currentUser.stripeCustomerId
      if (!stripeCustomerId) {
        stripeCustomerId = (await this.stripeService.createCustomer(currentUser.fullName, currentUser.email)).id

        await trx.getRepository(User).update({ id: currentUser.id }, { stripeCustomerId })
      }

      await this.stripeService.charge(amount, input.paymentMethodId, stripeCustomerId)

      const payment = await trx.getRepository(Payment).save(
        this.paymentRepository.create({
          amount,
          classId: input.classId,
          courseId: classRecord.courseId,
          enrolmentId: enrolment.id,
          note: `Class fee - ${moment().format('MM/YYYY')}`,
          type: PaymentType.PAY_IN,
          userId: currentUser.id,
        })
      )

      await trx
        .getRepository(Enrolment)
        .update(
          { id: enrolment.id },
          { status: getEnrolmentStatus(enrolment.startTime, enrolment.endTime), paymentId: payment.id }
        )

      return payment
    })
  }
}
