import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Enrolment } from '../../database/entities/enrolment.entity'
import { CreateEnrolmentInput } from './dto/create-enrolment.input'
import { EnrolmentService } from './enrolment.service'
import { EnrolmentsPagination } from './dto/enrolment-pagination.output-'
import { EnrolmentQueryParams } from './dto/enrolment-query-params.input'
import { GraphQLResolveInfo } from 'graphql'
import { EnrolmentLoader } from './enrolment.loader'
import { Course } from 'src/database/entities/course.entity'
import { Class } from 'src/database/entities/class.entity'

@Resolver(() => Enrolment)
export class EnrolmentResolver {
  constructor(private readonly enrolmentService: EnrolmentService, private enrolmentLoader: EnrolmentLoader) {}

  @Mutation(() => Enrolment)
  createEnrolment(@Args('input') input: CreateEnrolmentInput, @CurrentUser() currentUser: User) {
    return this.enrolmentService.create(input, currentUser.id)
  }

  @Query(() => EnrolmentsPagination, { name: 'enrolments' })
  findAll(
    @Args('queryParams', { nullable: true }) queryParams: EnrolmentQueryParams,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.enrolmentService.findAll(queryParams, info)
  }

  @Query(() => EnrolmentsPagination, { name: 'myEnrolments' })
  findMyEnrolments(
    @Args('queryParams', { nullable: true }) queryParams: EnrolmentQueryParams,
    @Info() info: GraphQLResolveInfo,
    @CurrentUser() currentUser: User
  ) {
    return this.enrolmentService.findAll(queryParams, info, currentUser)
  }

  @Query(() => Enrolment, { name: 'myEnrolmentByCourse' })
  findMyEnrolment(@Args('courseId', { type: () => ID }) courseId: string, @CurrentUser() currentUser: User) {
    return this.enrolmentService.findOne({ courseId, userId: currentUser.id })
  }

  @Query(() => Enrolment, { name: 'enrolment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.enrolmentService.findOne({ id })
  }

  @Query(() => Boolean, { name: 'isEnrolled' })
  isEnrolled(@Args('courseId', { type: () => ID }) courseId: string, @CurrentUser() currentUser: User) {
    return this.enrolmentService.isEnrolled(courseId, currentUser.id)
  }

  @Mutation(() => Boolean)
  removeEnrolment(@Args('id', { type: () => ID }) id: string) {
    return this.enrolmentService.remove(id)
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() enrolment: Enrolment) {
    const { userId } = enrolment
    return this.enrolmentLoader.batchUsers.load(userId)
  }

  @ResolveField('course', () => Course)
  async getCourse(@Parent() enrolment: Enrolment) {
    const { courseId } = enrolment
    return this.enrolmentLoader.batchCourses.load(courseId)
  }

  @ResolveField('class', () => Class)
  async getClass(@Parent() enrolment: Enrolment) {
    const { classId } = enrolment
    return this.enrolmentLoader.batchClasses.load(classId)
  }
}
