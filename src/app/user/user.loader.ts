import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { Role } from 'src/database/entities/role.entity'
import { In, Repository } from 'typeorm'

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  public readonly batchRoles = new DataLoader(async (roleIds: string[]) => {
    const roles = await this.roleRepository.findBy({ id: In(roleIds) })
    const rolesMap = new Map(roles.map((item) => [item.id, item]))
    return roleIds.map((roleId) => rolesMap.get(roleId))
  })
}
