import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    return super.canActivate(context)
  }
}
