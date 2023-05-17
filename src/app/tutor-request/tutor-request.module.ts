import { Module } from '@nestjs/common'
import { TutorRequestService } from './tutor-request.service'
import { TutorRequestResolver } from './tutor-request.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/database/entities/user.entity'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, TutorRequest])],
  providers: [TutorRequestResolver, TutorRequestService],
})
export class TutorRequestModule {}
