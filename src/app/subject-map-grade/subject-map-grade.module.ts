import { Module } from '@nestjs/common';
import { SubjectMapGradeService } from './subject-map-grade.service';
import { SubjectMapGradeResolver } from './subject-map-grade.resolver';

@Module({
  providers: [SubjectMapGradeResolver, SubjectMapGradeService]
})
export class SubjectMapGradeModule {}
