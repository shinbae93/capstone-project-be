import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { LoginOutput } from './dto/login.output'
import { RegisterInput } from './dto/register.input'
import { Public } from 'src/decorators/public.decorator'
import { CurrentUser } from 'src/decorators/current-user.decorator'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginOutput, { name: 'login' })
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return await this.authService.login(input.email, input.password)
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@CurrentUser() curUser: User): Promise<boolean> {
    return await this.authService.logout(curUser)
  }

  @Public()
  @Mutation(() => User, { name: 'register' })
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return await this.authService.register(input)
  }

  @Public()
  @Mutation(() => String, { name: 'refreshToken' })
  async refreshToken(@Args('token') token: string, @CurrentUser() curUser: User): Promise<string> {
    return await this.authService.refreshToken(token, curUser.id)
  }
}
