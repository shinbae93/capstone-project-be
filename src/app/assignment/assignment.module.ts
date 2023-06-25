import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Assignment } from 'src/database/entities/assignment.entity'
import { Quiz } from 'src/database/entities/quiz.entity'
import { User } from 'src/database/entities/user.entity'
import { AssignmentLoader } from './assignment.loader'
import { AssignmentResolver } from './assignment.resolver'
import { AssignmentService } from './assignment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Quiz, User])],
  providers: [AssignmentResolver, AssignmentService, AssignmentLoader],
  exports: [AssignmentService],
})
export class AssignmentModule {}
