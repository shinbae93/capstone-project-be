import { Module } from '@nestjs/common'
import { GradeService } from './grade.service'
import { GradeResolver } from './grade.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Grade } from 'src/database/entities/grade.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  providers: [GradeResolver, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
