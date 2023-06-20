import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/database/entities/course.entity'
import { CalendarModule } from '../calendar/calendar.module'
import { ClassModule } from '../class/class.module'
import { GradeModule } from '../grade/grade.module'
import { SubjectModule } from '../subject/subject.module'
import { UserModule } from '../user/user.module'
import { CourseLoader } from './course.loader'
import { CourseResolver } from './course.resolver'
import { CourseService } from './course.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), GradeModule, SubjectModule, ClassModule, UserModule, CalendarModule],
  providers: [CourseResolver, CourseService, CourseLoader],
})
export class CourseModule {}
