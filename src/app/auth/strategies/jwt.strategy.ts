import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { User } from 'src/database/entities/user.entity'
import { UserService } from 'src/app/user/user.service'
import { ERROR_MESSAGE } from 'src/common/error-message'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload

    const user = await this.userService.findOne({ id })

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND)
    }

    return user
  }
}
