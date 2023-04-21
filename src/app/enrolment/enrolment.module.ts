import { Module } from '@nestjs/common';
import { EnrolmentService } from './enrolment.service';
import { EnrolmentResolver } from './enrolment.resolver';

@Module({
  providers: [EnrolmentResolver, EnrolmentService]
})
export class EnrolmentModule {}
