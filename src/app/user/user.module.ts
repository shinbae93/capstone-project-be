import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { User } from 'src/database/entities/user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, TutorDetail])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
