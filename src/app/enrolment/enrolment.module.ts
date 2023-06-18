import { Module } from '@nestjs/common'
import { EnrolmentService } from './enrolment.service'
import { EnrolmentResolver } from './enrolment.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enrolment } from 'src/database/entities/enrolment.entity'
import { Class } from 'src/database/entities/class.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Enrolment, Class])],
  providers: [EnrolmentResolver, EnrolmentService],
  exports: [EnrolmentService],
})
export class EnrolmentModule {}
