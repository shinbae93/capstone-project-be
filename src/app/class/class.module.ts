import { Module } from '@nestjs/common'
import { ClassService } from './class.service'
import { ClassResolver } from './class.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Class, Course])],
  providers: [ClassResolver, ClassService],
  exports: [ClassService],
})
export class ClassModule {}
