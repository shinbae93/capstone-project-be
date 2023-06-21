import { Injectable, Scope } from '@nestjs/common'
import * as DataLoader from 'dataloader'
import { UserService } from '../user/user.service'

@Injectable({ scope: Scope.REQUEST })
export class EnrolmentLoader {
  constructor(private userService: UserService) {}
  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.userService.findManyByIds(userIds)
    const usersMap = new Map(users.map((item) => [item.id, item]))
    return userIds.map((classId) => usersMap.get(classId))
  })
}
