import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { Quiz } from 'src/database/entities/quiz.entity'
import { AssignmentModule } from '../assignment/assignment.module'
import { QuizLoader } from './quiz.loader'
import { QuizResolver } from './quiz.resolver'
import { QuizService } from './quiz.service'

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Course, Class, Enrolment]), AssignmentModule],
  providers: [QuizResolver, QuizService, QuizLoader],
})
export class QuizModule {}
