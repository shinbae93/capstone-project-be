import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { Course } from 'src/database/entities/course.entity'
import { In, Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { Class } from 'src/database/entities/class.entity'

@Injectable({ scope: Scope.REQUEST })
export class EnrolmentLoader {
  constructor(
    private userService: UserService,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Class) private classRepository: Repository<Class>
  ) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.userService.findManyByIds(userIds)
    const usersMap = new Map(users.map((item) => [item.id, item]))
    return userIds.map((userId) => usersMap.get(userId))
  })

  public readonly batchCourses = new DataLoader(async (courseIds: string[]) => {
    const courses = await this.courseRepository.findBy({ id: In(courseIds) })
    const coursesMap = new Map(courses.map((item) => [item.id, item]))
    return courseIds.map((classId) => coursesMap.get(classId))
  })

  public readonly batchClasses = new DataLoader(async (classIds: string[]) => {
    const classes = await this.classRepository.findBy({ id: In(classIds) })
    const classesMap = new Map(classes.map((item) => [item.id, item]))
    return classIds.map((classId) => classesMap.get(classId))
  })
}
