import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { RoleId } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { Token } from 'src/database/entities/token.entity'
import { User } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginOutput } from './dto/login.output'
import { RegisterInput } from './dto/register.input'
import { JwtPayload } from './interfaces/jwt-payload.interface'

const SALT_ROUND = 10

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUND)
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }

  async login(email: string, password: string): Promise<LoginOutput> {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) {
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

    const accessToken = await this.jwtService.signAsync(payload)

    return {
      accessToken,
    }
  }

  async register(input: RegisterInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: input.email })
    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.EMAIL_ALREADY_EXISTED)
    }

    input.password = await this.hashPassword(input.password)

    const newUser = this.userRepository.create(input)
    newUser.roleId = RoleId.STUDENT

    return await this.userRepository.save(newUser)
  }

  async logout(refreshToken: string): Promise<boolean> {
    await this.tokenRepository.delete({ refreshToken })

    return true
  }
}
