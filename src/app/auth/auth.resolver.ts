import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { LoginOutput } from './dto/login.output'
import { RegisterInput } from './dto/register.input'
import { Public } from 'src/decorators/public.decorator'

@Public()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput, { name: 'login' })
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return await this.authService.login(input.email, input.password)
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Args('refreshToken') refreshToken: string): Promise<boolean> {
    return await this.authService.logout(refreshToken)
  }

  @Mutation(() => User, { name: 'register' })
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return await this.authService.register(input)
  }
}
