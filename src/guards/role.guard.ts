import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ROLES_KEY } from 'src/decorators/roles.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
    if (!roles) {
      return true
    }

    const request = GqlExecutionContext.create(context).getContext().req
    const currentUser = request.user

    return roles.some((role) => role === currentUser.roleId)
  }
}
