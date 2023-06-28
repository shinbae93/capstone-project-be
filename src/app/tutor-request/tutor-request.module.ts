import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { TutorRequestResolver } from './tutor-request.resolver'
import { TutorRequestService } from './tutor-request.service'
import { UserModule } from '../user/user.module'
import { TutorRequestLoader } from './tutor-request.loader'
import { User } from 'src/database/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TutorRequest, User]), UserModule],
  providers: [TutorRequestResolver, TutorRequestService, TutorRequestLoader],
})
export class TutorRequestModule {}
