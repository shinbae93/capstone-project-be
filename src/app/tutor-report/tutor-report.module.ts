import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { TutorReport } from 'src/database/entities/tutor-report.entity'
import { User } from 'src/database/entities/user.entity'
import { TutorReportLoader } from './tutor-report.loader'
import { TutorReportResolver } from './tutor-report.resolver'
import { TutorReportService } from './tutor-report.service'

@Module({
  imports: [TypeOrmModule.forFeature([TutorReport, User, Enrolment])],
  providers: [TutorReportResolver, TutorReportService, TutorReportLoader],
})
export class TutorReportModule {}
