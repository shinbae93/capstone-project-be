import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { TutorReview } from 'src/database/entities/tutor-review.entity'
import { UserModule } from '../user/user.module'
import { TutorReviewLoader } from './tutor-review.loader'
import { TutorReviewResolver } from './tutor-review.resolver'
import { TutorReviewService } from './tutor-review.service'

@Module({
  imports: [TypeOrmModule.forFeature([TutorReview, Enrolment, TutorDetail]), UserModule],
  providers: [TutorReviewResolver, TutorReviewService, TutorReviewLoader],
})
export class TutorReviewModule {}
