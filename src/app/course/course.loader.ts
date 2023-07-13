import { Injectable, Scope } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { groupBy } from 'lodash'
import { In } from 'typeorm'
import { ClassService } from '../class/class.service'
import { GradeService } from '../grade/grade.service'
import { SubjectService } from '../subject/subject.service'
import { UserService } from '../user/user.service'

@Injectable({ scope: Scope.REQUEST })
export class CourseLoader {
  constructor(
    private gradeService: GradeService,
    private subjectService: SubjectService,
    private classService: ClassService,
    private userService: UserService
  ) {}

  public readonly batchGrades = new DataLoader(async (gradeIds: string[]) => {
    const grades = await this.gradeService.findMany({ id: In(gradeIds) })
    const gradesMap = new Map(grades.map((item) => [item.id, item]))
    return gradeIds.map((gradeId) => gradesMap.get(gradeId))
  })

  public readonly batchSubjects = new DataLoader(async (subjectIds: string[]) => {
    const subjects = await this.subjectService.findMany({ id: In(subjectIds) })
    const subjectsMap = new Map(subjects.map((item) => [item.id, item]))
    return subjectIds.map((subjectId) => subjectsMap.get(subjectId))
  })

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.userService.findManyByIds(userIds)
    const usersMap = new Map(users.map((item) => [item.id, item]))
    return userIds.map((userId) => usersMap.get(userId))
  })

  public readonly batchClasses = new DataLoader(async (courseIds: string[]) => {
    const classes = await this.classService.findMany({ courseId: In(courseIds) })
    const classesMap = groupBy(classes, 'courseId')
    return courseIds.map((courseId) => classesMap[courseId])
  })
}
