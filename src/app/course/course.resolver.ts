import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Course } from '../../database/entities/course.entity'
import { CourseService } from './course.service'
import { CourseQueryParams } from './dto/course-query-params.input'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseStatusInput } from './dto/update-course-status.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { CoursesPagination } from './dto/courses-pagination.output'
import { Grade } from 'src/database/entities/grade.entity'
import { CourseLoader } from './course.loader'
import { Subject } from 'src/database/entities/subject.entity'
import { Class } from 'src/database/entities/class.entity'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService, private courseLoader: CourseLoader) {}

  @Query(() => CoursesPagination, { name: 'courses' })
  findAll(@Args('queryParams') queryParams: CourseQueryParams) {
    return this.courseService.findAll(queryParams)
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.courseService.findOne({ id })
  }

  @Mutation(() => Course)
  createCourse(@Args('input') input: CreateCourseInput, @CurrentUser() currentUser: User) {
    return this.courseService.create(input, currentUser)
  }

  @Mutation(() => Course)
  updateCourse(@Args('input') input: UpdateCourseInput) {
    return this.courseService.update(input.id, input)
  }

  @Mutation(() => Course)
  updateCourseStatus(@Args('input') input: UpdateCourseStatusInput) {
    return this.courseService.update(input.id, input)
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => ID }) id: string) {
    return this.courseService.remove(id)
  }

  @ResolveField('grade', () => Grade)
  async getGrade(@Parent() course: Course) {
    const { gradeId } = course
    return this.courseLoader.batchGrades.load(gradeId)
  }

  @ResolveField('subject', () => Subject)
  async getSubject(@Parent() course: Course) {
    const { subjectId } = course
    return this.courseLoader.batchSubjects.load(subjectId)
  }

  @ResolveField('classes', () => [Class], { nullable: true })
  async getClasses(@Parent() course: Course) {
    return course && this.courseLoader.batchClasses.load(course.id)
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() course: Course) {
    const { userId } = course
    return this.courseLoader.batchUsers.load(userId)
  }
}
