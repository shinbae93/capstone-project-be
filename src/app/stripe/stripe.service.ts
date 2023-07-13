import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
      timeout: 5000,
    })
  }

  async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    })
  }

  async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      confirm: true,
    })
  }

  // public async payout(destination: string, amount: number) {
  //   this.stripe.customers.createSource('', {
  //     source: ''
  //   })

  //   return this.stripe.payouts.create({
  //     destination,
  //     source_type:'',
  //     amount,
  //     currency: this.configService.get('STRIPE_CURRENCY'),
  //   })
  // }

  // public async refund(paymentMethodId: string, customerId: string) {
  //   return this.stripe.refunds.create({
  //     charge: '',
  //     currency: this.configService.get('STRIPE_CURRENCY'),
  //     amount: '',
  //     refund_application_fee: true,
  //     reason: '',
  //   })
  // }

  public async attachCreditCard(paymentMethodId: string, customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
    })
  }

  public async listCreditCards(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    })
  }
}
