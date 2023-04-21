import { Module } from '@nestjs/common';
import { TutorReportService } from './tutor-report.service';
import { TutorReportResolver } from './tutor-report.resolver';

@Module({
  providers: [TutorReportResolver, TutorReportService]
})
export class TutorReportModule {}
