import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { User } from 'src/database/entities/user.entity'
import { In, Repository } from 'typeorm'

@Injectable({ scope: Scope.REQUEST })
export class TutorDetailLoader {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.userRepository.findBy({ id: In(userIds) })
    const usersMap = new Map(users.map((item) => [item.id, item]))
    return userIds.map((classId) => usersMap.get(classId))
  })
}
