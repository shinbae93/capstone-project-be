import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/database/entities/user.entity'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserModule } from '../user/user.module'
import { StripeModule } from '../stripe/stripe.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    PassportModule,
    UserModule,
    StripeModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
