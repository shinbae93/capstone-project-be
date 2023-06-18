import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { EnrolmentModule } from '../enrolment/enrolment.module'
import { ClassLoader } from './class.loader'
import { ClassResolver } from './class.resolver'
import { ClassService } from './class.service'

@Module({
  imports: [TypeOrmModule.forFeature([Class, Course]), EnrolmentModule],
  providers: [ClassResolver, ClassService, ClassLoader],
  exports: [ClassService],
})
export class ClassModule {}
