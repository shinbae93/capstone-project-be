import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/database/entities/course.entity'
import { CourseResolver } from './course.resolver'
import { CourseService } from './course.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
