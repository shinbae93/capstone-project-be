import { Module } from '@nestjs/common'
import { EnrolmentService } from './enrolment.service'
import { EnrolmentResolver } from './enrolment.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enrolment } from 'src/database/entities/enrolment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Enrolment])],
  providers: [EnrolmentResolver, EnrolmentService],
})
export class EnrolmentModule {}
