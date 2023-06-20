import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentResolver } from './payment.resolver'
import { StripeModule } from '../stripe/stripe.module'

@Module({
  imports: [StripeModule],
  providers: [PaymentResolver, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
