import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { User } from 'src/database/entities/user.entity'
import { In, Repository } from 'typeorm'

@Injectable({ scope: Scope.REQUEST })
export class PaymentLoader {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Enrolment) private enrolmentRepository: Repository<Enrolment>,
    @InjectRepository(Class) private classRepository: Repository<Class>
  ) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.userRepository.findBy({ id: In(userIds) })
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

  public readonly batchEnrolments = new DataLoader(async (enrolmentIds: string[]) => {
    const enrolments = await this.enrolmentRepository.findBy({ id: In(enrolmentIds) })
    const enrolmentsMap = new Map(enrolments.map((item) => [item.id, item]))
    return enrolmentIds.map((enrolmentId) => enrolmentsMap.get(enrolmentId))
  })
}
