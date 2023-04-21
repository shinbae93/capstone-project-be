import { Module } from '@nestjs/common';
import { TutorDetailService } from './tutor-detail.service';
import { TutorDetailResolver } from './tutor-detail.resolver';

@Module({
  providers: [TutorDetailResolver, TutorDetailService]
})
export class TutorDetailModule {}
