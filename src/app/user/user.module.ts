import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from 'src/database/entities/role.entity'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { User } from 'src/database/entities/user.entity'
import { UserLoader } from './user.loader'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, TutorDetail, Role])],
  providers: [UserResolver, UserService, UserLoader],
  exports: [UserService],
})
export class UserModule {}
