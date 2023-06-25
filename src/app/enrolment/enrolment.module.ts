import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { CalendarModule } from '../calendar/calendar.module'
import { UserModule } from '../user/user.module'
import { EnrolmentLoader } from './enrolment.loader'
import { EnrolmentResolver } from './enrolment.resolver'
import { EnrolmentService } from './enrolment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Enrolment, Class, Course]), CalendarModule, UserModule],
  providers: [EnrolmentResolver, EnrolmentService, EnrolmentLoader],
  exports: [EnrolmentService],
})
export class EnrolmentModule {}
