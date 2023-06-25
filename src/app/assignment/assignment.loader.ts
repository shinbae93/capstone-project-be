import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { Quiz } from 'src/database/entities/quiz.entity'
import { User } from 'src/database/entities/user.entity'
import { In, Repository } from 'typeorm'

@Injectable({ scope: Scope.REQUEST })
export class AssignmentLoader {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public readonly batchQuizzes = new DataLoader(async (quizIds: string[]) => {
    const quizzes = await this.quizRepository.findBy({ id: In(quizIds) })
    const quizzesMap = new Map(quizzes.map((item) => [item.id, item]))
    return quizIds.map((classId) => quizzesMap.get(classId))
  })

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.userRepository.findBy({ id: In(userIds) })
    const usersMap = new Map(users.map((item) => [item.id, item]))
    return userIds.map((classId) => usersMap.get(classId))
  })
}
