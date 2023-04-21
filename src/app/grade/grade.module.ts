import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeResolver } from './grade.resolver';

@Module({
  providers: [GradeResolver, GradeService]
})
export class GradeModule {}
