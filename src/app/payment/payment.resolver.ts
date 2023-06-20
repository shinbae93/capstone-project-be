import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Payment } from '../../database/entities/payment.entity'
import { ChargeInput } from './dto/charge.input'
import { PaymentService } from './payment.service'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  charge(@Args('chargeInput') chargeInput: ChargeInput, @CurrentUser() currentUser: User) {
    return this.paymentService.charge(chargeInput, currentUser)
  }

  @Query(() => [Payment], { name: 'payments' })
  findAll() {
    return this.paymentService.findAll()
  }

  @Query(() => Payment, { name: 'payment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findOne(id)
  }

  @Mutation(() => Payment)
  removePayment(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.remove(id)
  }
}
