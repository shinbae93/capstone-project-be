import { Module } from '@nestjs/common'
import { GradeService } from './grade.service'
import { GradeResolver } from './grade.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Grade } from 'src/database/entities/grade.entity'
import { SubjectMapGradeModule } from '../subject-map-grade/subject-map-grade.module'

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), SubjectMapGradeModule],
  providers: [GradeResolver, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
