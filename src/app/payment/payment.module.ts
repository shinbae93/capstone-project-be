import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/database/entities/class.entity'
import { Course } from 'src/database/entities/course.entity'
import { Payment } from 'src/database/entities/payment.entity'
import { User } from 'src/database/entities/user.entity'
import { StripeModule } from '../stripe/stripe.module'
import { PaymentResolver } from './payment.resolver'
import { PaymentService } from './payment.service'
import { PaymentLoader } from './payment.loader'
import { Enrolment } from 'src/database/entities/enrolment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Class, Course, User, Enrolment]), StripeModule],
  providers: [PaymentResolver, PaymentService, PaymentLoader],
  exports: [PaymentService],
})
export class PaymentModule {}
