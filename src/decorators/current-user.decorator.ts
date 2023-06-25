import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)

  console.log(
    '🚀 ~ file: current-user.decorator.ts:8 ~ CurrentUser ~ ctx.getContext().req.user:',
    ctx.getContext().req.user
  )
  return ctx.getContext().req.user
})
