import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorator/current-user.decorator'
import { Course } from '../../database/entities/course.entity'
import { CourseService } from './course.service'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => [Course], { name: 'courses' })
  findAll() {
    return this.courseService.findAll()
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
  removeCourse(@Args('id', { type: () => ID }) id: string) {
    return this.courseService.remove(id)
  }
}
