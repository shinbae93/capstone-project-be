import { Module } from '@nestjs/common';
import { TutorReviewService } from './tutor-review.service';
import { TutorReviewResolver } from './tutor-review.resolver';

@Module({
  providers: [TutorReviewResolver, TutorReviewService]
})
export class TutorReviewModule {}
