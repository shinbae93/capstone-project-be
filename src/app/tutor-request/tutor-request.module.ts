import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { TutorRequestResolver } from './tutor-request.resolver'
import { TutorRequestService } from './tutor-request.service'

@Module({
  imports: [TypeOrmModule.forFeature([TutorRequest])],
  providers: [TutorRequestResolver, TutorRequestService],
})
export class TutorRequestModule {}
