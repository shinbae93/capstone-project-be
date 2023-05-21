import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubjectMapGrade } from 'src/database/entities/subject-map-grade.entity'
import { SubjectMapGradeService } from './subject-map-grade.service'

@Module({
  imports: [TypeOrmModule.forFeature([SubjectMapGrade])],
  providers: [SubjectMapGradeService],
  exports: [SubjectMapGradeService],
})
export class SubjectMapGradeModule {}
