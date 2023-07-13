import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Payment } from '../../database/entities/payment.entity'
import { ChargeInput } from './dto/charge.input'
import { PaymentPagination } from './dto/payment-pagination.output'
import { PaymentQueryParams } from './dto/payment-query-params.input'
import { PaymentLoader } from './payment.loader'
import { PaymentService } from './payment.service'
import { Enrolment } from 'src/database/entities/enrolment.entity'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService, private paymentLoader: PaymentLoader) {}

  @Mutation(() => Payment, { name: 'charge' })
  charge(@Args('input') input: ChargeInput, @CurrentUser() currentUser: User) {
    return this.paymentService.charge(input, currentUser)
  }

  @Query(() => PaymentPagination, { name: 'payments' })
  findAll(@Args('queryParams') queryParams: PaymentQueryParams) {
    return this.paymentService.findAll(queryParams)
  }

  @Query(() => PaymentPagination, { name: 'myPayments' })
  findMyAll(@Args('queryParams') queryParams: PaymentQueryParams) {
    return this.paymentService.findAll(queryParams)
  }

  @Query(() => Payment, { name: 'payment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.paymentService.findOne(id)
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() payment: Payment) {
    const { userId } = payment
    return this.paymentLoader.batchUsers.load(userId)
  }

  @ResolveField('course', () => Course)
  async getCourse(@Parent() payment: Payment) {
    const { courseId } = payment
    return this.paymentLoader.batchCourses.load(courseId)
  }

  @ResolveField('class', () => Class)
  async getClass(@Parent() payment: Payment) {
    const { classId } = payment
    return this.paymentLoader.batchClasses.load(classId)
  }

  @ResolveField('enrolment', () => Enrolment)
  async getEnrolment(@Parent() payment: Payment) {
    const { enrolmentId } = payment
    return this.paymentLoader.batchEnrolments.load(enrolmentId)
  }
}
