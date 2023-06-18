import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Course } from 'src/database/entities/course.entity'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Class } from '../../database/entities/class.entity'
import { EnrolmentService } from '../enrolment/enrolment.service'
import { ClassLoader } from './class.loader'
import { ClassService } from './class.service'
import { CreateClassInput } from './dto/create-class.input'
import { UpdateClassInput } from './dto/update-class.input'

@Resolver(() => Class)
export class ClassResolver {
  constructor(
    private readonly classService: ClassService,
    private readonly classLoader: ClassLoader,
    private readonly enrolmentservice: EnrolmentService
  ) {}

  @Mutation(() => Class)
  createClass(@Args('input') input: CreateClassInput, @CurrentUser() currentUser: User) {
    return this.classService.create(input, currentUser.id)
  }

  @Query(() => [Class], { name: 'classes' })
  findAll(@Args('courseId', { type: () => ID, nullable: true }) courseId: string) {
    return this.classService.findAll(courseId)
  }

  @Query(() => Class, { name: 'class' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.classService.findOne({ id })
  }

  @Mutation(() => Class)
  updateClass(@Args('input') input: UpdateClassInput, @CurrentUser() currentUser: User) {
    return this.classService.update(input.id, input, currentUser.id)
  }

  @Mutation(() => Boolean)
  removeClass(@Args('id', { type: () => ID }) id: string) {
    return this.classService.remove(id)
  }

  @ResolveField('course', () => Course)
  async getCourse(@Parent() parent: Class) {
    const { courseId } = parent
    return this.classLoader.batchCourses.load(courseId)
  }

  @ResolveField('occupiedSlots', () => Number)
  async getOccupiedSlots(@Parent() parent: Class) {
    const { id } = parent
    return this.enrolmentservice.getCountByClass(id)
  }
}
