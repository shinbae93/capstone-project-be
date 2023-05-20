import { Module } from '@nestjs/common'
import { SubjectService } from './subject.service'
import { SubjectResolver } from './subject.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subject } from 'src/database/entities/subject.entity'
import { SubjectMapGrade } from 'src/database/entities/subject-map-grade.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectMapGrade])],
  providers: [SubjectResolver, SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
