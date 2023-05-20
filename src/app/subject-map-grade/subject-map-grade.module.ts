import { Module } from '@nestjs/common'
import { SubjectMapGradeService } from './subject-map-grade.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubjectMapGrade } from 'src/database/entities/subject-map-grade.entity'
import { Subject } from 'src/database/entities/subject.entity'
import { Grade } from 'src/database/entities/grade.entity'
import { SubjectModule } from '../subject/subject.module'
import { GradeModule } from '../grade/grade.module'

@Module({
  imports: [TypeOrmModule.forFeature([SubjectMapGrade, Subject, Grade]), SubjectModule, GradeModule],
  providers: [SubjectMapGradeService],
  exports: [SubjectMapGradeService],
})
export class SubjectMapGradeModule {}
