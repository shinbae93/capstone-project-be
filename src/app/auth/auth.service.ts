import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ERROR_MESSAGE } from 'src/common/constants/error-message'
import { User } from 'src/database/entities/user.entity'
import { UserService } from '../user/user.service'
import { LoginOutput } from './dto/login.output'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from 'src/database/entities/token.entity'
import { Repository } from 'typeorm'
import { RegisterInput } from './dto/register.input'
import { Role } from 'src/common/constants/role'

const SALT_ROUND = 10

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUND)
  }

  async comparePassword(password: string, storedPassword: string) {
    return await bcrypt.compare(password, storedPassword)
  }

  async login(email: string, password: string): Promise<LoginOutput> {
    const user = await this.userService.findOne({ email })
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.INCORRECT_USERNAME_OR_PASSWORD)
    }

    const hashedPassword = await this.hashPassword(password)
    const isPasswordMatching = await this.comparePassword(hashedPassword, user.password)
    if (!isPasswordMatching) {
      throw new UnauthorizedException(ERROR_MESSAGE.INCORRECT_USERNAME_OR_PASSWORD)
    }

    const payload: JwtPayload = {
      id: user.id,
      fullname: user.fullName,
      email: user.email,
      role: user.roleId,
    }

    const accessToken = await this.jwtService.signAsync(payload)

    return {
      accessToken,
    }
  }

  async register(input: RegisterInput): Promise<User> {
    const user = await this.userService.findOne({ email: input.email })
    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.EMAIL_ALREADY_EXISTED)
    }

    input.password = await this.hashPassword(input.password)

    const newUser = this.userRepository.create(input)
    newUser.roleId = Role.Student

    return await this.userRepository.save(newUser)
  }

  async logout(refreshToken: string): Promise<boolean> {
    await this.tokenRepository.delete({ refreshToken })

    return true
  }
}
