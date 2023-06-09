import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { RoleId } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { User } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginOutput } from './dto/login.output'
import { RegisterInput } from './dto/register.input'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { ConfigService } from '@nestjs/config'
import { StripeService } from '../stripe/stripe.service'

const SALT_ROUND = 10

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private stripeService: StripeService
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUND)
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }

  async login(email: string, password: string, isAdmin = false): Promise<LoginOutput> {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.INCORRECT_USERNAME_OR_PASSWORD)
    }
    if (isAdmin && user.roleId !== RoleId.ADMIN) {
      throw new UnauthorizedException(ERROR_MESSAGE.INCORRECT_USERNAME_OR_PASSWORD)
    }

    const isPasswordMatching = await this.comparePassword(password, user.password)
    if (!isPasswordMatching) {
      throw new UnauthorizedException(ERROR_MESSAGE.INCORRECT_USERNAME_OR_PASSWORD)
    }

    const payload: JwtPayload = {
      id: user.id,
      fullname: user.fullName,
      email: user.email,
      role: user.roleId,
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    ])

    await this.userRepository.update({ id: user.id }, { refreshToken })

    return {
      accessToken,
      refreshToken,
    }
  }

  async register(input: RegisterInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: input.email })
    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.EMAIL_ALREADY_EXISTED)
    }

    const password = await this.hashPassword(input.password)

    const stripeCustomer = await this.stripeService.createCustomer(input.fullName, input.email)

    const newUser = this.userRepository.create({
      ...input,
      password,
      roleId: RoleId.STUDENT,
      stripeCustomerId: stripeCustomer.id,
    })

    return await this.userRepository.save(newUser)
  }

  async logout(user: User): Promise<boolean> {
    await this.userRepository.update({ id: user.id }, { refreshToken: null })
    return true
  }

  async refreshToken(token: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ refreshToken: token })
    if (!user) {
      throw new UnauthorizedException()
    }

    this.jwtService.verify(user.refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    })

    if (token !== user.refreshToken) {
      throw new UnauthorizedException()
    }

    const payload: JwtPayload = {
      id: user.id,
      fullname: user.fullName,
      email: user.email,
      role: user.roleId,
    }

    return this.jwtService.signAsync(payload)
  }
}
