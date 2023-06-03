import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Course } from '../../database/entities/course.entity'
import { CourseService } from './course.service'
import { CourseQueryParams } from './dto/course-query-params.input'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseStatusInput } from './dto/update-course-status.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { CoursesPagination } from './dto/courses-pagination.output'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

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
}
