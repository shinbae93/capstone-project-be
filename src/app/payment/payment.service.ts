import { Injectable } from '@nestjs/common'
import { User } from 'src/database/entities/user.entity'
import { StripeService } from '../stripe/stripe.service'
import { ChargeInput } from './dto/charge.input'

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  async charge(input: ChargeInput, currentUser: User) {
    await this.stripeService.charge(input.amount, input.paymentMethodId, currentUser.stripeCustomerId)
    return 'This action adds a new payment'
  }

  findAll() {
    return `This action returns all payment`
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`
  }

  remove(id: number) {
    return `This action removes a #${id} payment`
  }
}
