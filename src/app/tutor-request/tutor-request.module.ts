import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { TutorRequestResolver } from './tutor-request.resolver'
import { TutorRequestService } from './tutor-request.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([TutorRequest]), UserModule],
  providers: [TutorRequestResolver, TutorRequestService],
})
export class TutorRequestModule {}
