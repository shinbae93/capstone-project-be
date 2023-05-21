import { Module } from '@nestjs/common'
import { TutorReviewService } from './tutor-review.service'
import { TutorReviewResolver } from './tutor-review.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorReview } from 'src/database/entities/tutor-review.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TutorReview])],
  providers: [TutorReviewResolver, TutorReviewService],
})
export class TutorReviewModule {}
