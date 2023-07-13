import { Module } from '@nestjs/common'
import { TutorDetailService } from './tutor-detail.service'
import { TutorDetailResolver } from './tutor-detail.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { TutorDetailLoader } from './tutor-detail.loader'
import { User } from 'src/database/entities/user.entity'
import { TutorReview } from 'src/database/entities/tutor-review.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TutorDetail, User, TutorReview])],
  providers: [TutorDetailResolver, TutorDetailService, TutorDetailLoader],
})
export class TutorDetailModule {}
