import { Injectable, Scope } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { groupBy } from 'lodash'
import { In, Repository } from 'typeorm'
import { AssignmentService } from '../assignment/assignment.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'

@Injectable({ scope: Scope.REQUEST })
export class QuizLoader {
  constructor(
    private assignmentService: AssignmentService,
    @InjectRepository(Class) private classRepository: Repository<Class>
  ) {}

  public readonly batchAssignments = new DataLoader(async (quizIds: string[]) => {
    const assignments = await this.assignmentService.findMany({ quizId: In(quizIds) })
    const assignmentsMap = groupBy(assignments, 'quizId')
    return quizIds.map((courseId) => assignmentsMap[courseId])
  })

  public readonly batchClasses = new DataLoader(async (classIds: string[]) => {
    const classes = await this.classRepository.findBy({ id: In(classIds) })
    const classesMap = new Map(classes.map((item) => [item.id, item]))
    return classIds.map((classId) => classesMap.get(classId))
  })
}
