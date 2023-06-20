import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { CalendarModule } from '../calendar/calendar.module'
import { EnrolmentResolver } from './enrolment.resolver'
import { EnrolmentService } from './enrolment.service'
import { Course } from 'src/database/entities/course.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Enrolment, Class, Course]), CalendarModule],
  providers: [EnrolmentResolver, EnrolmentService],
  exports: [EnrolmentService],
})
export class EnrolmentModule {}
