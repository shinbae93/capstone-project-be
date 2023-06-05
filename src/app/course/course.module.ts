import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/database/entities/course.entity'
import { CourseResolver } from './course.resolver'
import { CourseService } from './course.service'
import { SubjectModule } from '../subject/subject.module'
import { GradeModule } from '../grade/grade.module'
import { ClassModule } from '../class/class.module'
import { CourseLoader } from './course.loader'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), GradeModule, SubjectModule, ClassModule, UserModule],
  providers: [CourseResolver, CourseService, CourseLoader],
})
export class CourseModule {}
