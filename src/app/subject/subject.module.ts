import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subject } from 'src/database/entities/subject.entity'
import { SubjectMapGradeModule } from '../subject-map-grade/subject-map-grade.module'
import { SubjectResolver } from './subject.resolver'
import { SubjectService } from './subject.service'
import { Course } from 'src/database/entities/course.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Course]), SubjectMapGradeModule],
  providers: [SubjectResolver, SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
